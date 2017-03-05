'use strict';

const _ = require('lodash-node');
const Boom = require('boom');
const context = require('hapi-methods-injection').methods;

module.exports = function () {

  return function (request, reply) {
    const itemsNo = request.query.itemsNo;
    const searchTerm = request.params.searchTerm;

    context.services.openLibraryClient.getBooksFilteredByTitleSearch(searchTerm, itemsNo, function (err, booksList) {
      if (!err) {
        reply(booksList);
      } else {
        reply(Boom.serverUnavailable(err.message));
      }
    });

  };
};
