import 'dart:io';

import 'package:logging/logging.dart';
import 'package:logging_handlers/server_logging_handlers.dart';
import 'package:rpc/rpc.dart';
import 'package:mongo_dart/mongo_dart.dart';

const String _API_PREFIX = '/api';
final ApiServer _apiServer =
    new ApiServer(apiPrefix: _API_PREFIX, prettyPrint: true);

main() async {
  // Add a simple log handler to log information to a server side file.
  Logger.root.level = Level.ALL;
  Logger.root.onRecord.listen(new SyncFileLoggingHandler('hits.log'));
  if (stdout.hasTerminal) {
    Logger.root.onRecord.listen(new LogPrintHandler());
  }

  _apiServer.addApi(new Stumble());
  _apiServer.enableDiscoveryApi();

  HttpServer server = await HttpServer.bind(InternetAddress.ANY_IP_V4, 8080);
  server.listen(_apiServer.httpRequestHandler);
}

@ApiClass(name: 'stumble', version: 'v1')
class Stumble {

  @ApiMethod(method: 'GET', path: '{user}')
  List<String> upon(String user, {String languages}) async {
  	Db db = new Db("mongodb://api:password@ds051523.mongolab.com:51523/gitr");
  	await db.open();
  	var collection = db.collection('repositories');

    var list = await collection
      .find(where
        .oneFrom('langs.lang',languages.split(',')))
      .toList();

  	await db.close();

    list = await rank(list, languages.split(','));
    int end = list.length > 1000 ? 1000 : list.length;
    return list.getRange(0, end);
  }

  List<String> rank(Map list, List<String> languages) async {

    for (int i = 0; i < list.length; i++) {
      var docLangs = [];
      for (int j = 0; j < list[i]['langs'].length; j++) {
        docLangs.add(list[i]['langs'][j]);
      }
      var commonLangs = [];
      for (int j = 0; j < docLangs.length; j++) {
        if (languages.contains(docLangs[j]['lang'])) {
          commonLangs.add(docLangs[j]);
        }
      }
      double weight = 0;
      for (int j = 0; j < commonLangs.length; j++) {
        weight += commonLangs[j]['percent'];
      }

      weight *= list[i]['stars'];
      weight /= 100;

      list[i].addAll({'weight': weight});
    }
    list.sort((m1, m2) {
      return (-1) * m1['weight'].compareTo(m2['weight']);
    });
    return list;
  }
}