/* eslint-disable */

const assert = require('assert'),
    sqb = require('sqb');

sqb.use(require('../'));

var query;
var result;

describe('MSSQK select queries', function() {

  it('should serialize "limit"', function(done) {
    query = sqb.select().from('table1').as('t1').limit(10);
    result = query.generate({
      dialect: 'mssql',
      prettyPrint: 0
    });
    assert.equal(result.sql, 'select * from table1 FETCH NEXT 10 ROWS ONLY');
    done();
  });

  it('should serialize "limit" pretty print', function(done) {
    query = sqb.select().from('table1').as('t1').limit(10);
    result = query.generate({
      dialect: 'mssql',
      prettyPrint: 1
    });
    assert.equal(result.sql,
        'select * from table1\n' +
        'FETCH NEXT 10 ROWS ONLY');
    done();
  });

  it('should serialize "limit/offset"', function(done) {
    query = sqb.select()
        .from('table1')
        .offset(4)
        .limit(10);
    result = query.generate({
      dialect: 'mssql'
    });
    assert.equal(result.sql, 'select * from table1\n' +
        'OFFSET 4 ROWS FETCH NEXT 10 ROWS ONLY');
    done();
  });

  it('should serialize "limit/offset" pretty print', function(done) {
    query = sqb.select()
        .from('table1')
        .offset(4)
        .limit(10);
    result = query.generate({
      dialect: 'mssql',
      prettyPrint: true
    });
    assert.equal(result.sql,
        'select * from table1\n' +
        'OFFSET 4 ROWS FETCH NEXT 10 ROWS ONLY');
    done();
  });

  it('Should serialize params', function(done) {
    query = sqb.select().from('table1').where(['ID', /ID/]);
    result = query.generate({
      dialect: 'mssql'
    }, {ID: 5});
    assert.equal(result.sql, 'select * from table1 where ID = @ID');
    assert.deepEqual(result.values, {ID: 5});
    done();
  });

});

