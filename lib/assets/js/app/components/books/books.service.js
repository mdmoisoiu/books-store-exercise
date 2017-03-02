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

      /**
       * Loads all books from backend
       * @returns {*|Promise.<TResult>}
       */
        function getBooksList(){
            return $http.get('/books?itemsNo='+booksPerPage)
                .then( function(response){
                        return response.data;
                    });
        }

      /**
       * Loads all books from backend identified by booksSearchTerm.
       * If is a valid olid returns a collection with all books that have that olid
       * Else returns a collection with all books that match the search term in title
       * @returns {*|Promise.<TResult>}
       */
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
