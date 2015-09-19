import 'dart:io';
import 'dart:async';
import 'package:html/parser.dart' show parse;
import 'package:html/dom.dart';

class Page {
  String url;
  String repo;
  String user;
  String desc;
  Map<String, int> langs;
}


main() {
  final String url = 'https://github.com/joecheatham/duckduckgo';
  for (int i = 1; i <= 1; i++) {

  }
  scrape(url);
  
}

scrape(String url) {
  getHtml(url).then((document) {
    // page title
    print(url);

    //user
    print(document.querySelector('.author > .url > span').text);
    //repo
    print(document.querySelector('.entry-title > strong').text);
    //desc
    print(document.querySelector('#readme > .markdown-body > p').text);
    //langs
    document.querySelectorAll('.repository-lang-stats-numbers > li').forEach((e) {
      print(e.querySelector('.lang').text + ': ' +  e.querySelector('.percent').text);
    });
    //lines
    // ???
    print('\n');
  });
}

/// fetch and parse the HTML from [url]
Future<Document> getHtml(String url) =>
    new HttpClient()
      .getUrl(Uri.parse(url))
      .then((req) => req.close())
      .then((res) => res
          .asyncExpand((bytes) => new Stream.fromIterable(bytes))
          .toList())
      .then((bytes) => parse(bytes, sourceUrl: url));