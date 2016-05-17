'use strict';
const Joi = require('joi');
const Boom = require('boom');
const TestModel = require('../../models/testModel');

exports.register = (server, options, next) => {
    const api = server.select('api');

    api.route({
        method: 'GET',
        path: '/tests/{id}',
        handler: (req, reply) => {
            try{
                let db = server.plugins["hapi-massive"].db;
                let testModel = new TestModel(db);

                testModel.getById(req.params.id).then((test) => {
                   return reply(test);
                }).catch((err) => {
                    server.log(['error'], err.toString() );
                    return reply(Boom.badImplementation());
                });
            }catch(err){
                server.log(['error'], err.toString() );
                return reply(Boom.badImplementation());
            }
        }
    });
    
    api.route({
        method: 'POST',
        path: '/tests',
        config: {
            validate: {
                payload: {
                    name: Joi.string()
                }
            }
        },
        handler: (req, reply) => {
            try{
                let db = server.plugins["hapi-massive"].db;
                let testModel = new TestModel(db);

                testModel.save(req.payload).then((newtest) => {
                   return reply(newtest);
                }).catch((err) => {
                    server.log(['error'], err.toString() );
                    return reply(Boom.badImplementation());
                });
            }catch(err){
                server.log(['error'], err.toString() );
                return reply(Boom.badImplementation());
            }
        }
    });
    
    return next();
};
 
exports.register.attributes = {
    name: 'test',
    version: '1.0.0'
};