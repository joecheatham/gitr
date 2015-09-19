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
  final String github = "https://github.com/";
  String url = 'https://github.com/search?q=stars%3A%3E1&type=Repositories';
  for (int i = 1; i <= 1; i++) {
    getHtml(url).then((document) {
      document.querySelectorAll('ul.repo-list').forEach((e) {
        String title = e.querySelector('h3.repo-list-name > a').text.split('/')[0];
        getHtml(github + title).then((user) {
          user.querySelectorAll('h3.repo-list-name > a').forEach((a) {
            scrape(github + title + '/' + a.text.trim());
          });
        });
      });
    });
  }
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