'use strict';

const context = require('hapi-methods-injection').methods;
const Boom = require('boom');

module.exports = function () {

  return function (request, reply) {
    const itemsNo = request.query.itemsNo;

    context.services.openLibraryClient.getAllBooks(itemsNo, function (err, res) {
      if (!err) {
        reply(res);
      } else {
        reply(Boom.serverUnavailable(err.message));
      }
    });

  };
};
