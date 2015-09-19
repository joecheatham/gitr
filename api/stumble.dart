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
  List<String> upon(String user) async {
  	Db db = new Db("mongodb://api:password@ds051523.mongolab.com:51523/gitr");
  	await db.open();
  	var collection = db.collection('repositories');


    var list = await collection.find(where.oneFrom('langs.lang',['Shell','Rust']).fields(['url']).limit(100)).toList();

  	// var list = await collection
   //    .find(where
   //        .eq('user', 'facebook')
   //        .sortBy('stars', descending: true)
   //        .fields(['url']))
   //        .toList();

  	await db.close();
    return list;
  }

  // List<String> rank(String user) async {
  //   Db db = new Db("mongodb://api:password@ds051523.mongolab.com:51523/gitr");
  //   await db.open();
  //   var collection = db.collection('repositories');
  //   var list = await collection.find(where.limit(1000));
  //   (match * match.percent) * stars/
  //   100

  //   var 
  // }

  // class Item {
  //   int score;
  //   String url;
  // }
}