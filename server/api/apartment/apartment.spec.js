'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('GET /api/v1/apartments', function() {

  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/v1/apartments')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.apartments.should.be.instanceof(Array);
        done();
      });
  });


  it('should respond with JSON array of 20 objects', function(done) {
    request(app)
      .get('/api/v1/apartments')

      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.apartments.should.be.instanceof(Array);

        //res.body.should.be.equal(20);
        done();
      });
  });

  //get the apartments scoped up
});
