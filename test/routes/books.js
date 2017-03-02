const Lab = require('lab');
const lab = exports.lab = Lab.script();
const Code = require('code');
var sinon = require('sinon')
var server = require("../../index.js");
var context = require('hapi-methods-injection').methods;

lab.experiment("/books route", function() {

  lab.test("should rely on openLibraryClient.getAllBooks service result, and set a default value for itemsNo", function(done) {
    let books = ['test 1', 'test 2'],
      options = {
      method: "GET",
      url: "/books"
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

  lab.test("should reject request with non integer itemsNo query parameter value", function(done) {
    let options = {
      method: "GET",
      url: "/books?itemsNo=a8"
    };

    server.inject(options, function(response) {
      Code.expect(response.statusCode).to.equal(400);
      done();
    });
  });

  lab.test("should return service unavailable when the open library service fails", function(done) {
    let options = {
        method: "GET",
        url: "/books"
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

