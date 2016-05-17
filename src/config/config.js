'use strict';
process.env.NODE_ENV = process.env.NODE_ENV || 'developement';

// load the config file for the current environment
var config = require('./env/' + process.env.NODE_ENV);

// export config
module.exports = config;