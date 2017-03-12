'use strict'

const Joi = require('joi');

module.exports = [
  {
    method: 'GET',
    path: '/books',
    handler: { allBooks: {} },
    config: {
      validate: {
        headers: true,
        params: false,
        query: {
          itemsNo: Joi.number().integer().min(1).max(100).default(6)
        }
      },
      tags: ['api'],
      description: 'Retrieve all books'
    }
  },
  {
    method: 'GET',
    path: '/books/filter/title/{searchTerm}',
    handler: { filterBooksByTitle: {} },
    config: {
      validate: {
        headers: true,
        params: {
          searchTerm: Joi.string().required()
        },
        query: {
          itemsNo: Joi.number().integer().min(1).max(100).default(6)
        }
      },
      tags: ['api'],
      description: 'Retrieve all books with title matching the search term'
    }
  },
  {
    method: 'GET',
    path: '/books/filter/olid/{olid}',
    handler: { filterBooksByOlid: {} },
    config: {
      validate: {
        headers: true,
        params: {
          olid: Joi.string().required().regex(/^OL(\d+)M$/)
        },
        query: {
          itemsNo: Joi.number().integer().min(1).max(100).default(6)
        }
      },
      tags: ['api'],
      description: 'Retrieve a collection of books identified by the passed olid'
    }
  },
]
