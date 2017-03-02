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

