'use strict';
const Code = require('code');
const Lab = require('lab');
const Sinon = require('sinon');
const SinonStubPromise = require('sinon-stub-promise');
const lab = exports.lab = Lab.script();
SinonStubPromise(Sinon);
const server = require('../../src').server;
const MockDB = require('../mockDB');

process.env.NODE_ENV = 'testing';

lab.experiment('Test', () => {
    let mockDB = new MockDB(Sinon);
    let promise = mockDB.promise;


    lab.beforeEach((done) => {
        promise = mockDB.promise;
        return done();
    });

    lab.test('Successful creation of new test via api', (done) => {
        let httpOptions = {
            method: 'POST',
            url: '/api/tests',
            payload: {
                name: 'test'
            }
        };
        
        promise.resolves({ id: 2, name: 'test'});
        
        server.plugins['hapi-massive'] = mockDB;
        server.inject(httpOptions, (response) => {
            let result = response.result;
            Code.expect(response.statusCode).to.equal(200);
            Code.expect(result).object();
            Code.expect(result.id).to.equal(2);
            return done();
        });
    });
    
    lab.test('Get test via api', (done) => {
       let httpOptions = {
            method: 'GET',
            url: '/api/tests/1'
        };
        promise.resolves({id: 1, name: 'test'});
        server.plugins['hapi-massive'] = mockDB;
        server.inject(httpOptions, (response) => {
            let result = response.result;
            Code.expect(response.statusCode).to.equal(200);
            Code.expect(result).object();
            Code.expect(result.id).to.equal(1);
            return done();
        });
    });
});