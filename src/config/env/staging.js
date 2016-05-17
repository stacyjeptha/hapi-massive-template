'use strict';
module.exports = {
  api: { 
      port: 8000
  },
  site: {
      port: 8080
  },
  db: {
    name: 'test',
    username: 'postgres',
    password: 'postgres',
    server: '127.0.0.1',
    uri: process.env.PG
  },
  log: {
    path: './logs/api.log'
  }
}