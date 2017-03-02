'use strict'

const path = require('path')

module.exports = {
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory: {
      path: path.join('lib', 'views'),
      listing: true
    }
  }
}
