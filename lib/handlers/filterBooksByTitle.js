'use strict';

const _ = require('lodash-node');
const Boom = require('boom');
const context = require('hapi-methods-injection').methods;

module.exports = function () {

  return function (request, reply) {
    const itemsNo = request.query.itemsNo;
    const searchTerm = request.params.searchTerm;

    context.services.openLibraryClient.getAllBooks(itemsNo, function (err, booksList) {
      if (!err) {

        let filtredBooksList = _.filter(booksList, function (item) {
          return item.title.indexOf(searchTerm) > -1;
        });

        reply(filtredBooksList);
      } else {
        reply(Boom.serverUnavailable(err.message));
      }
    });

  };
};
