const Lab = require('lab');
const lab = exports.lab = Lab.script();
const Code = require('code');
var sinon = require('sinon')
var server = require("../../index.js");
var context = require('hapi-methods-injection').methods;

lab.experiment("/books/filter/olid/{olid}", function() {

  lab.test("should rely on openLibraryClient.getBooksFilteredByOlid service and set a default itemsNo", function(done) {
    let books = [
      {identifiers: {openlibrary: 'OL234M'}}
    ], options = {
      method: "GET",
      url: "/books/filter/olid/OL234M"
    };

    let getBooksFilteredByOlidStub = sinon
      .stub(context.services.openLibraryClient, 'getBooksFilteredByOlid')
      .yields(null, books);

    server.inject(options, function(response) {
      var result = response.result;

      Code.expect(response.statusCode).to.equal(200);
      Code.expect(result).to.be.instanceof(Array);
      Code.expect(result).to.have.length(1);

      Code.expect(getBooksFilteredByOlidStub.lastCall.args[0]).to.equal('OL234M');
      Code.expect(getBooksFilteredByOlidStub.lastCall.args[1]).to.equal(6);

      context.services.openLibraryClient.getBooksFilteredByOlid.restore();
      done();
    });
  });

  lab.test("should reject requests with invalid olid parameter value", function(done) {
    let options = {
      method: "GET",
      url: "/books/filter/olid/123"
    };

    server.inject(options, function(response) {
      Code.expect(response.statusCode).to.equal(400);
      done();
    });
  });

  lab.test("should return service unavailable when the open library service fails", function(done) {
    let options = {
      method: "GET",
      url: "/books/filter/olid/OL234M"
    };

    sinon
      .stub(context.services.openLibraryClient, 'getBooksFilteredByOlid')
      .throws("SomeError");

    server.inject(options, function(response) {
      Code.expect(response.statusCode).to.equal(500);

      context.services.openLibraryClient.getBooksFilteredByOlid.restore();
      done();
    });
  });
});
