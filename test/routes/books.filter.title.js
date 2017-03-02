const Lab = require('lab');
const lab = exports.lab = Lab.script();
const Code = require('code');
var sinon = require('sinon')
var server = require("../../index.js");
var context = require('hapi-methods-injection').methods;

lab.experiment("/books/filter/title/{searchTerm}", function() {

  lab.test("should rely on openLibraryClient.getAllBooks service and filter by search term, set a default itemsNo", function(done) {
    let books = [
      {title: 'test 1'},
      {title: 'something 2'},
      {title: '3 something'},
      {title: '4 aaa'}
    ], options = {
      method: "GET",
      url: "/books/filter/title/something"
    };

    let getAllBooksStub = sinon
      .stub(context.services.openLibraryClient, 'getAllBooks')
      .yields(null, books);

    server.inject(options, function(response) {
      var result = response.result;

      Code.expect(response.statusCode).to.equal(200);
      Code.expect(result).to.be.instanceof(Array);
      Code.expect(result).to.have.length(2);

      Code.expect(getAllBooksStub.lastCall.args[0]).to.equal(6);

      context.services.openLibraryClient.getAllBooks.restore();
      done();
    });
  });

  lab.test("should declare not found requests with missing searchTerm parameter value", function(done) {
    let options = {
      method: "GET",
      url: "/books/filter/title/"
    };

    server.inject(options, function(response) {
      Code.expect(response.statusCode).to.equal(404);
      done();
    });
  });

  lab.test("should return service unavailable when the open library service fails", function(done) {
    let options = {
      method: "GET",
      url: "/books/filter/title/test"
    };

    sinon
      .stub(context.services.openLibraryClient, 'getAllBooks')
      .throws("SomeError");

    server.inject(options, function(response) {
      Code.expect(response.statusCode).to.equal(500);

      context.services.openLibraryClient.getAllBooks.restore();
      done();
    });
  });
});
