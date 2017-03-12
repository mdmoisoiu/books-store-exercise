'use strict'

const assert = require('assert');

const hapi = require('hapi');
const inert = require('inert');
const vision = require('vision');
const HapiSwagger = require('hapi-swagger');

const indexRoutes = require('./lib/routes/index.routes')
const assetRoutes = require('./lib/routes/asset.routes')
const bookRoutes = require('./lib/routes/book.routes')

const server = new hapi.Server()
server.connection({
  host: process.env.IP || 'localhost',
  port: process.env.PORT || 3000
})

server.register([inert, vision,HapiSwagger], (err) => {
  assert(!err, err)

  server.route(indexRoutes)
  server.route(assetRoutes)
  server.route(bookRoutes)

  server.start((err) => {
    assert(!err, err)
    console.log(`Server running at: ${server.info.uri}`)
  })
})

server.register(
  [
    {
      register: require('hapi-methods-injection'),
      options: {
        relativeTo: __dirname,
        methods: [{
          prefix: 'services',
          path: './lib/services'
        }]
      }
    },
    {
      register: require('hapi-handlers'),
      options: {
        relativeTo: __dirname,
        includes: './lib/handlers/*.js'
      }
    }
  ],
  (err) => {
    if (err) {
      throw err;
    }
});


module.exports = server;
