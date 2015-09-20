import 'dart:io';
import 'dart:core';
import 'dart:async';
import 'package:html/parser.dart' show parse;
import 'package:html/dom.dart';
import 'package:mongo_dart/mongo_dart.dart';
import 'package:args/args.dart';

main(List<String> arguments) {
  final parser = new ArgParser();
  parser.addFlag('language', abbr: 'l', negatable: false);
    var argResults = parser.parse(arguments);
    String url = 'https://github.com/trending?l=' + argResults.rest[0];
    crawl(url);
}

crawl(String url) {
  final String github = "https://github.com/";
  int count = 0;
  getHtml(url).then((document) {
    document.querySelectorAll('ol.repo-list > li').forEach((e) {
      String title =
      e.querySelector('span.prefix').text;
      getHtml(github + title).then((user) {
        user.querySelectorAll('h3.repo-list-name > a').forEach((a) {
          scrape(github + title + '/' + a.text.trim());
          count++;
          print(count.toString());
        });
      });
    });
  });
}


scrape(String url) {
  Db db = new Db("mongodb://admin:password@ds051523.mongolab.com:51523/gitr");
  db.open().then((success) {
    if (success) {
      var collection = db.collection('repositories');
      getHtml(url).then((document) {
        var langs = [];
        document.querySelectorAll('.repository-lang-stats-numbers > li').forEach((e) {
          langs.add({"lang": e.querySelector('.lang').text, "percent": double.parse(e.querySelector('.percent').text.split('%')[0])});
        });
        String desc = "";
        if (document.querySelector('#readme > .markdown-body > p') != null)
          desc = document.querySelector('#readme > .markdown-body > p').text;

        collection.update(where.eq('url', url), modify.set('url', url), upsert: true);
        collection.update(where.eq('url', url), modify.set('user', document.querySelector('.author > .url > span').text), upsert: true);
        collection.update(where.eq('url', url), modify.set('repo', document.querySelector('.entry-title > strong').text), upsert: true);
        collection.update(where.eq('url', url), modify.set('langs', langs), upsert: true);
        collection.update(where.eq('url', url), modify.set('desc', desc), upsert: true);
        collection.update(where.eq('url', url), modify.set('stars', int.parse(document.querySelector('a.social-count.js-social-count').text.trim().replaceAll(',',''))), upsert: true);

        });
    }
  });
}

/// fetch and parse the HTML from [url]
Future<Document> getHtml(String url) => new HttpClient()
.getUrl(Uri.parse(url))
.then((req) => req.close())
.then((res) =>
  res.asyncExpand((bytes) => new Stream.fromIterable(bytes)).toList())
.then((bytes) => parse(bytes, sourceUrl: url));