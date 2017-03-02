angular.module('bookstore.templates').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('components/books/books.html',
    "<div class=\"books-container\" ng-init=\"vm.getBooks()\">\n" +
    "  <div class=\"input-group\">\n" +
    "    <input type=\"text\" class=\"form-control\" placeholder=\"SEARCH\" ng-model=\"vm.booksSearchTerm\" ng-keypress=\"vm.onSearchBooksKeyPress($event)\" />\n" +
    "    <span class=\"input-group-btn\">\n" +
    "      <button class=\"btn btn-default search-button\" ng-click=\"vm.searchBooks()\" type=\"button\"><span class=\"glyphicon glyphicon-search\"></span></button>\n" +
    "    </span>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"books-title-container alert alert-success\">\n" +
    "    FEATURED\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"row\" >\n" +
    "    <div class=\"col-md-4\" ng-repeat=\"book in vm.books\">\n" +
    "      <div class=\"thumbnail\">\n" +
    "        <img ng-src=\"{{::book.cover.medium}}\">\n" +
    "        <div class=\"caption\">\n" +
    "          <b class=\"book-title\">{{::book.title}}</b>\n" +
    "          <p>By <span class=\"book-author\">{{::book.authors[0].name}}</span></p>\n" +
    "          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>\n" +
    "          <p><span class=\"book-price\">$10.11</span><a href=\"#\" class=\"btn btn-primary pull-right black-background\" role=\"button\">Add to Cart</a></p>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('components/loader/loader.html',
    "Loading ...\n"
  );


  $templateCache.put('components/main/main.html',
    "<div ng-controller=\"MainController\">\n" +
    "    <div class=\"books-header\">\n" +
    "      <img src=\"img/download.svg\" />\n" +
    "      <header>Book Store</header>\n" +
    "      <div class=\"books-sub-tile\">The biggest choice on web</div>\n" +
    "    </div>\n" +
    "    <div ui-view></div>\n" +
    "\n" +
    "    <loader ng-show=\"vm.showLoading\"></loader>\n" +
    "\n" +
    "</div>\n"
  );

}]);
