'use strict';

const _ = require('lodash-node');
const request = require("request");

/**
 * Retreive the specified number of books from openlibrary.org
 * @param next
 */
exports.getBooks = function (itemsNo, next) {
  getAllBooks(function (error, allBooks) {
    if (error) {
      next(error, null);
    } else {
      next(null, allBooks.slice(0, itemsNo));
    }
  });
};

exports.getBooksFilteredByOlid = function (olid, itemsNo, next) {
  getAllBooks(function (error, allBooks) {
    if (error) {
      next(error, null);
    } else {
      let filtredBooksList = _.filter(allBooks, function (item) {
        return item.identifiers.openlibrary.indexOf(olid) > -1;
      });
      next(null, filtredBooksList.slice(0, itemsNo));
    }
  });
};

exports.getBooksFilteredByTitleSearch = function (searchTerm, itemsNo, next) {
  getAllBooks(function (error, allBooks) {
    if (error) {
      next(error, null);
    } else {
      let filtredBooksList = _.filter(allBooks, function (item) {
        return item.title.indexOf(searchTerm) > -1;
      });
      next(null, filtredBooksList.slice(0, itemsNo));
    }
  });
};


function getAllBooks(next){
  const url = 'https://openlibrary.org/api/books?bibkeys=OLID:OL22895148M,OLID:OL6990157M,OLID:OL7101974M,OLID:OL6732939M,OLID:OL7193048M,OLID:OL24347578M,OLID:OL24364628M,OLID:OL24180216M,OLID:OL24948637M,OLID:OL1631378M,OLID:OL979600M,OLID:OL33674M,OLID:OL7950349M,OLID:OL349749M,OLID:OL30460M,OLID:OL24347578M&jscmd=data&format=json';

  request(url, function(error, response, body) {
    if(error){
      next(error, null);
    } else if (response.statusCode === 200) {
      let allBooks = convertRawData(body);
      next(null, allBooks);
    } else {
      next('Unable to load data from openlibrary.org', null);
    }
  });
}

function convertRawData(rawData) {
  let parsedData = JSON.parse(rawData);
  return _(parsedData)
    .values()
    .value();
}
