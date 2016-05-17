'use strict';

class TestModel {
    constructor(db){
        this.tableName = "test";
        this.db = db[this.tableName];
    }    
    
    getById(id) {
      return this.db.findOneAsync({id: id});
    }
    
    save(obj){
       return this.db.saveAsync(obj);
    }
}

module.exports = TestModel;