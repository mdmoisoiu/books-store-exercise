(function(){
    'use strict';

    describe('BooksService', function() {

      var $httpBackend, BooksService;

        beforeEach(function () {
          module('bookstore');
          inject(function(_$httpBackend_, _BooksService_){
            $httpBackend = _$httpBackend_;
            BooksService = _BooksService_;
          })
        });

        afterEach(function() {
          $httpBackend.verifyNoOutstandingExpectation();
          $httpBackend.verifyNoOutstandingRequest();
        });

        describe('getBooksList', function() {
            it('call the backend service in order to load the books', function() {
              var expectedBookList = ['test'];

              $httpBackend.when('GET', '/books?itemsNo=6').respond(expectedBookList);

              BooksService.getBooksList().then(function(bookList) {
                expect(expectedBookList).toEqual(bookList);
              });

              $httpBackend.flush();
            });
        });

        describe('searchBooks', function() {
            it('call the OLID search backend service in order to search the books, for a valid OLID search term', function() {
              var expectedBookList = ['test'],
                  searchTerm = 'OL24364628M';

              $httpBackend
                .when('GET', '/books/filter/olid/'+encodeURIComponent(searchTerm))
                .respond(expectedBookList);

              BooksService.searchBooks(searchTerm).then(function(bookList) {
                expect(expectedBookList).toEqual(bookList);
              });

              $httpBackend.flush();
            });

            it('call the title search backend service in order to search the books, for a non OLID search term', function() {
              var expectedBookList = ['test'],
                  searchTerm = 'OLaM';

              $httpBackend
                .when('GET', '/books/filter/title/'+encodeURIComponent(searchTerm)+'?itemsNo=6')
                .respond(expectedBookList);

              BooksService.searchBooks(searchTerm).then(function(bookList) {
                expect(expectedBookList).toEqual(bookList);
              });

              $httpBackend.flush();
            });
        });
    });
})();
