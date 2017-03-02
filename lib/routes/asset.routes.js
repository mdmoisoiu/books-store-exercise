'use strict'

module.exports = [
  {
    method: 'GET',
    path: '/css/{param*}',
    handler: {
      directory: {
        path: 'lib/assets/css',
        listing: true
      }
    }
  },
  {
    method: 'GET',
    path: '/js/{param*}',
    handler: {
      directory: {
        path: 'lib/assets/js',
        listing: true
      }
    }
  },
  {
    method: 'GET',
    path: '/img/{param*}',
    handler: {
      directory: {
        path: 'lib/assets/img',
        listing: true
      }
    }
  },
  {
    method: 'GET',
    path: '/fonts/{param*}',
    handler: {
      directory: {
        path: 'lib/assets/fonts',
        listing: true
      }
    }
  }
]
