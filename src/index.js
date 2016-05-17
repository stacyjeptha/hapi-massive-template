'use strict';

const Hapi = require('hapi');
const massive = require('massive');
const config = require('./config/config');
const plugins = require('./plugins');

const server = new Hapi.Server();
server.connection({ port: config.api.port, labels: ['api'] });

server.register({
    register: require("hapi-massive"),
    options: {
        connectionString: config.db.uri || `postgres://${config.db.username}:${config.db.password}@${config.db.server}/${config.db.name}`
   }
}, (err) => {
    if (err) {
        console.error('Failed to load a plugin:', err);
    }
});

server.route({
    method: 'GET',
    path:'/index.html', 
    handler: function (request, reply) {
        return reply('hapi-massive-template');
    }
});

server.register(plugins, {
    routes: {
        prefix: '/api'
    }
}, (err) => {
    if (err) {
        console.error('Failed to load a plugin:', err);
    }
});

const goodConfigOptions = {
 opsInterval: 1000,
    filter: {
        access_token: 'censor'
    },
    reporters: [{
        reporter: require('good-console'),
        events: { ops: '*', log: '*', response: '*', error: '*'}
    }]
};

server.register({
    register: require('good'),
    options: goodConfigOptions
}, (err) => {
    if (err) {
        console.error(err);
    }
});

exports.server = server;