const Lab = require('lab');
const lab = exports.lab = Lab.script();
const Code = require('code');
var sinon = require('sinon')
var server = require("../../index.js");
var context = require('hapi-methods-injection').methods;
var nock = require('nock');

lab.experiment("openLibraryClient.getAllBooks", function() {

  lab.test("return decode the response from openlibrary.org and limit the result to itemsNo", function(done) {

    var scope = nock('https://openlibrary.org')
      .get('/api/books?bibkeys=OLID:OL22895148M,OLID:OL6990157M,OLID:OL7101974M,OLID:OL6732939M,OLID:OL7193048M,OLID:OL24347578M,OLID:OL24364628M,OLID:OL24180216M,OLID:OL24948637M,OLID:OL1631378M,OLID:OL979600M,OLID:OL33674M,OLID:OL7950349M,OLID:OL349749M,OLID:OL30460M,OLID:OL24347578M&jscmd=data&format=json')
      .reply(200, '[{"aa": "test1"},{"bb": "test2"},{"cc": "test3"},{"dd": "test4"},{"ee": "test5"}]');

    context.services.openLibraryClient.getAllBooks(3, function(err, books){

      Code.expect(books).to.be.instanceof(Array);
      Code.expect(books).to.have.length(3);

      nock.cleanAll();
      done();
    });
  });

  lab.test("return an error open library is not available", function(done) {

    var scope = nock('https://openlibrary.org')
      .get('/api/books?bibkeys=OLID:OL22895148M,OLID:OL6990157M,OLID:OL7101974M,OLID:OL6732939M,OLID:OL7193048M,OLID:OL24347578M,OLID:OL24364628M,OLID:OL24180216M,OLID:OL24948637M,OLID:OL1631378M,OLID:OL979600M,OLID:OL33674M,OLID:OL7950349M,OLID:OL349749M,OLID:OL30460M,OLID:OL24347578M&jscmd=data&format=json')
      .reply(404);

    context.services.openLibraryClient.getAllBooks(6, function(err, books){

      Code.expect(err).to.be.not.null();
      Code.expect(books).to.be.null();

      nock.cleanAll();
      done();
    });
  });
});
