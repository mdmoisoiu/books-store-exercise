(function(){
    'use strict';

    describe('BooksController', function() {

        var BooksController, $q, $scope,
          BooksService = jasmine.createSpyObj('BooksService', ['getBooksList', 'searchBooks']);

        beforeEach(function () {
          module('bookstore', function ($provide) {
            $provide.value('BooksService', BooksService);
          });

          inject(function(_$controller_, _$q_, _$rootScope_){
            $q = _$q_;
            $scope = _$rootScope_.$new();
            BooksController = _$controller_('BooksController', { $scope: $scope });
          })
        });

        describe('getBooks', function() {
            it('call BooksService.getBooks in order to load the books', function() {
                var bookList = ['test'];
                BooksService.getBooksList.and.callFake(function() {
                    return $q.when(bookList);
                  });

                BooksController.getBooks();
                $scope.$apply();

                expect(BooksController.books).toEqual(bookList);
                expect(BooksService.getBooksList).toHaveBeenCalled();
            });
        });

        describe('searchBooks', function() {
            it('call BooksService.searchBooks in order to search for books', function() {
                var bookList = ['test'],
                    searchTerm = 'te';


                BooksService.searchBooks.and.callFake(function() {
                    return $q.when(bookList);
                  });

                BooksController.booksSearchTerm = searchTerm;
                BooksController.searchBooks();
                $scope.$apply();

                expect(BooksController.books).toEqual(bookList);
                expect(BooksService.searchBooks).toHaveBeenCalledWith(searchTerm);
            });
        });

    });
})();
