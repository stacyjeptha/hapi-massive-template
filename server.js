const server = require('./src').server;

server.start((err) => {
    if (err) {
        console.error('Failed to start server: ', err);
    }
    console.log('Api Server running at:', server.select('api').info.uri);
});