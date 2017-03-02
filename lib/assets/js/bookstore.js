(function(){
  'use strict';
  angular.module('bookstore.templates', []);

  angular.module('bookstore', [
          'ui.router',
          'bookstore.templates'
      ]).config([ '$urlRouterProvider', function($urlRouterProvider) {

          $urlRouterProvider.otherwise("/books");
      }
  ]);

})();

(function(){
    'use strict';

    angular.module('bookstore').controller('BooksController', BooksController);

    var inject = ['BooksService'];
    function BooksController(BooksService) {
        var vm = this;

        vm.books = [];
        vm.booksSearchTerm = '';

        vm.getBooks = getBooks;
        vm.searchBooks = searchBooks;
        vm.onSearchBooksKeyPress = onSearchBooksKeyPress;

        //--------------------------------------------------------------------------

        function getBooks(){
          BooksService.getBooksList()
            .then(function(books){
              vm.books = books;
          });
        }

        function searchBooks() {
            if(!vm.booksSearchTerm){
              getBooks();
              return
            }

            BooksService.searchBooks(vm.booksSearchTerm)
              .then(function(books){
                vm.books = books;
              });
        }

        function onSearchBooksKeyPress(keyEvent) {
            if (keyEvent.which === 13){
                vm.searchBooks();
            }
        }
    }
    BooksController.$inject = inject;

})();

(function(){
    'use strict';

    angular.module('bookstore').factory('BooksService', BooksService);

    var inject = ['$http'];
    function BooksService($http) {
        var booksPerPage = 6;

        return {
            searchBooks: searchBooks,
            getBooksList: getBooksList
        };

        function getBooksList(){
            return $http.get('/books?itemsNo='+booksPerPage)
                .then( function(response){
                        return response.data;
                    });
        }

        function searchBooks(booksSearchTerm){
            var url = null;
            if(isTermOlid(booksSearchTerm)) {
                url = '/books/filter/olid/'+encodeURIComponent(booksSearchTerm);
            } else {
                url = '/books/filter/title/'+encodeURIComponent(booksSearchTerm) + '?itemsNo='+booksPerPage;
            }
            return $http.get(url)
                .then( function(response){
                        return response.data;
                });
        }

        function isTermOlid(term){
            return /^OL(\d+)M$/.test(term);
        }
    }
    BooksService.$inject = inject;

})();

(function(){
    'use strict';

    angular.module('bookstore')
        .config([ '$stateProvider', function($stateProvider){
            $stateProvider.state('books', {
                url: "/books",
                templateUrl: 'components/books/books.html',
                controller: 'BooksController',
                controllerAs: 'vm'
            });
        }]);
})();



(function(){
    'use strict';
    angular.module('bookstore').directive('loader', LoaderDirective);

    function LoaderDirective() {
        return {
            restrict: 'E',
            templateUrl: 'components/loader/loader.html'
        };
    }

})();



(function(){
    'use strict';
    angular.module('bookstore').controller('MainController', MainController);

    var inject = ['$rootScope'];
    function MainController($rootScope) {

        var vm = this;

        vm.showLoading = false;

        $rootScope.$on('$stateChangeStart', stateChangeStart);
        $rootScope.$on('$stateChangeSuccess', stateChangeSuccess);

        function stateChangeStart(event, nextState, currentState) {
            if (nextState.resolve) {
                vm.showLoading = true;
            }
        }

        function stateChangeSuccess(event, toState, toParams, fromState, fromParams) {
            if (toState.resolve) {
                vm.showLoading = false;
            }
        }
    }
    MainController.$inject = inject;
})();


(function(){
    'use strict';
    angular.module('bookstore').directive('main', MainDirective);

    function MainDirective() {
        return {
            restrict: 'E',
            templateUrl: 'components/main/main.html'
        };
    }

})();


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

//# sourceMappingURL=bookstore.js.map