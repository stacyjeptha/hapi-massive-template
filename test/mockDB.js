'use strict';

class MockDB  {
    constructor(sinon) {
        let promise = sinon.stub().returnsPromise();
        return { 
            promise: promise,
            db:{
                test: {
                    promise: promise,
                    findOneAsync: (obj) => { return promise.thenable;},
                    saveAsync:(obj) => { return promise.thenable; }
                }
            }
        };
    } 
}

module.exports = MockDB;