'use strict';

const context = require('hapi-methods-injection').methods;
const Boom = require('boom');

module.exports = function () {

  return function (request, reply) {
    const itemsNo = request.query.itemsNo;

    context.services.openLibraryClient.getBooks(itemsNo, function (err, booksList) {
      if (!err) {
        reply(booksList);
      } else {
        reply(Boom.serverUnavailable(err.message));
      }
    });

  };
};
