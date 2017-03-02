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
