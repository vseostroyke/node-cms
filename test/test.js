var assert = require('assert');
describe('Array', function () {
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            assert.equal(-1, [1, 2, 3].indexOf(5));
            assert.equal(-1, [1, 2, 3].indexOf(0));
        });
    });
});


var mongo = require('mocha-mongo')('mongodb://localhost');
var clean = mongo.cleanCollections(['coll1', 'coll2']); //only need to create this once
var ready = mongo.ready();
describe('test using cleaned collections', function () {

    it('count assert', function () {
        clean(function (db, done) {
            db.collection('coll1').find().count(function (err, count) {

                assert.equal(count, 0);
                done();
            })
        });
    });

    it('ready assert', function () {
        clean(function (db, done) {
            db.collection('test').insert({hello: 'world'}, done);

        });
    })
});

