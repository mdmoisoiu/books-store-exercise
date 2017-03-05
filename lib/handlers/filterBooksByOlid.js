'use strict';

const _ = require('lodash-node');
const Boom = require('boom');
const context = require('hapi-methods-injection').methods;

module.exports = function () {

  return function (request, reply) {
    const itemsNo = request.query.itemsNo;
    const olid = request.params.olid;

    context.services.openLibraryClient.getBooksFilteredByOlid(olid, itemsNo, function (err, booksList) {
      if (!err) {
        reply(booksList);
      } else {
        reply(Boom.serverUnavailable(err.message));
      }
    });

  };
};
