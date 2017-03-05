const Lab = require('lab');
const lab = exports.lab = Lab.script();
const Code = require('code');
var sinon = require('sinon')
var server = require("../../index.js");
var context = require('hapi-methods-injection').methods;
var nock = require('nock');

lab.experiment("openLibraryClient", function() {

  lab.experiment("getBooks", function() {

    lab.test("return a decoded books list from openlibrary.org and limit the result content to itemsNo", function(done) {

      let scope = nock('https://openlibrary.org')
        .get('/api/books?bibkeys=OLID:OL22895148M,OLID:OL6990157M,OLID:OL7101974M,OLID:OL6732939M,OLID:OL7193048M,OLID:OL24347578M,OLID:OL24364628M,OLID:OL24180216M,OLID:OL24948637M,OLID:OL1631378M,OLID:OL979600M,OLID:OL33674M,OLID:OL7950349M,OLID:OL349749M,OLID:OL30460M,OLID:OL24347578M&jscmd=data&format=json')
        .reply(200, `[
          {"aa": "test1"},
          {"bb": "test2"},
          {"cc": "test3"},
          {"dd": "test4"},
          {"ee": "test5"}
      ]`);

      context.services.openLibraryClient.getBooks(3, function(err, books){

        Code.expect(books).to.be.instanceof(Array);
        Code.expect(books).to.have.length(3);

        nock.cleanAll();
        done();
      });
    });

    lab.test("return an error open library is not available", function(done) {

      let scope = nock('https://openlibrary.org')
        .get('/api/books?bibkeys=OLID:OL22895148M,OLID:OL6990157M,OLID:OL7101974M,OLID:OL6732939M,OLID:OL7193048M,OLID:OL24347578M,OLID:OL24364628M,OLID:OL24180216M,OLID:OL24948637M,OLID:OL1631378M,OLID:OL979600M,OLID:OL33674M,OLID:OL7950349M,OLID:OL349749M,OLID:OL30460M,OLID:OL24347578M&jscmd=data&format=json')
        .reply(404);

      context.services.openLibraryClient.getBooks(6, function(err, books){

        Code.expect(err).to.be.not.null();
        Code.expect(books).to.be.null();

        nock.cleanAll();
        done();
      });
    });
  });

  lab.experiment("getBooksFilteredByOlid", function() {

    lab.test("return a decoded books list from openlibrary.org, filtering the books list by olid and limit the result content to itemsNo", function(done) {

      let scope = nock('https://openlibrary.org')
        .get('/api/books?bibkeys=OLID:OL22895148M,OLID:OL6990157M,OLID:OL7101974M,OLID:OL6732939M,OLID:OL7193048M,OLID:OL24347578M,OLID:OL24364628M,OLID:OL24180216M,OLID:OL24948637M,OLID:OL1631378M,OLID:OL979600M,OLID:OL33674M,OLID:OL7950349M,OLID:OL349749M,OLID:OL30460M,OLID:OL24347578M&jscmd=data&format=json')
        .reply(200, `[
        {"identifiers": {"openlibrary": "OL123M"}},
        {"identifiers": {"openlibrary": "OL234M"}},
        {"identifiers": {"openlibrary": "OL345M"}},
        {"identifiers": {"openlibrary": "OL456M"}}
      ]`);

      context.services.openLibraryClient.getBooksFilteredByOlid('OL234M', 6, function(err, books){
        Code.expect(books).to.be.instanceof(Array);
        Code.expect(books).to.have.length(1);
        Code.expect(books[0].identifiers.openlibrary).to.equal('OL234M');

        nock.cleanAll();
        done();
      });

    });

    lab.test("return an error open library is not available", function(done) {

      let scope = nock('https://openlibrary.org')
        .get('/api/books?bibkeys=OLID:OL22895148M,OLID:OL6990157M,OLID:OL7101974M,OLID:OL6732939M,OLID:OL7193048M,OLID:OL24347578M,OLID:OL24364628M,OLID:OL24180216M,OLID:OL24948637M,OLID:OL1631378M,OLID:OL979600M,OLID:OL33674M,OLID:OL7950349M,OLID:OL349749M,OLID:OL30460M,OLID:OL24347578M&jscmd=data&format=json')
        .reply(404);

      context.services.openLibraryClient.getBooksFilteredByOlid('OL234M', 6, function(err, books){

        Code.expect(err).to.be.not.null();
        Code.expect(books).to.be.null();

        nock.cleanAll();
        done();
      });
    });
  });

  lab.experiment("getBooksFilteredByTitleSearch", function() {

    lab.test("return a decoded books list from openlibrary.org, filtering the books list by title content search and limit the result content to itemsNo", function(done) {

      let scope = nock('https://openlibrary.org')
        .get('/api/books?bibkeys=OLID:OL22895148M,OLID:OL6990157M,OLID:OL7101974M,OLID:OL6732939M,OLID:OL7193048M,OLID:OL24347578M,OLID:OL24364628M,OLID:OL24180216M,OLID:OL24948637M,OLID:OL1631378M,OLID:OL979600M,OLID:OL33674M,OLID:OL7950349M,OLID:OL349749M,OLID:OL30460M,OLID:OL24347578M&jscmd=data&format=json')
        .reply(200, `[
          {"title": "test 1"},
          {"title": "something 2"},
          {"title": "3 something"},
          {"title": "4 aaa"}
        ]`);

      context.services.openLibraryClient.getBooksFilteredByTitleSearch('something', 6, function(err, books){
        Code.expect(books).to.be.instanceof(Array);
        Code.expect(books).to.have.length(2);
        Code.expect(books[0].title).to.equal('something 2');
        Code.expect(books[1].title).to.equal('3 something');

        nock.cleanAll();
        done();
      });

    });

    lab.test("return an error open library is not available", function(done) {

      let scope = nock('https://openlibrary.org')
        .get('/api/books?bibkeys=OLID:OL22895148M,OLID:OL6990157M,OLID:OL7101974M,OLID:OL6732939M,OLID:OL7193048M,OLID:OL24347578M,OLID:OL24364628M,OLID:OL24180216M,OLID:OL24948637M,OLID:OL1631378M,OLID:OL979600M,OLID:OL33674M,OLID:OL7950349M,OLID:OL349749M,OLID:OL30460M,OLID:OL24347578M&jscmd=data&format=json')
        .reply(404);

      context.services.openLibraryClient.getBooksFilteredByTitleSearch('something', 6, function(err, books){

        Code.expect(err).to.be.not.null();
        Code.expect(books).to.be.null();

        nock.cleanAll();
        done();
      });
    });
  });
});
