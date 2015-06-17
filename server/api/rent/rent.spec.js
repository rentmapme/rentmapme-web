'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');


var testEmailUser = {email: 'test@test.com',
                    password: 'test'}
//describe('GET /rents', function() {
//  it ('should authenticate and get rents', function(done){
//    request(app)
//      .post('/auth/local/')
//      .send(testEmailUser)
//      .end(function(err,res){
//        var token = res.body.token;
//        //console.log(res.body);
//        if (!token) {
//          request(app)
//              .get('/api/v1/rents')
//              .set('Accept', 'application/json')
//              .query({ access_token: token })
//              .expect(200)
//              .expect('Content-Type', /json/)
//              .end(function(err, res) {
//                if (err) return done(err);
//                res.body.should.be.instanceof(Array);
//                done();
//              });
//        }if (!token) {
//          request(app)
//              .get('/api/v1/rents')
//              .set('Accept', 'application/json')
//              .query({ access_token: token })
//              .expect(200)
//              .expect('Content-Type', /json/)
//              .end(function(err, res) {
//                if (err) return done(err);
//                res.body.should.be.instanceof(Array);
//                done();
//              });
//        }
//        done()
//      })
//  })
//
//});


describe('POST /rents', function() {
  it('should authenticate and post rents', function (done) {
    request(app)
      .post('/auth/local/')
      .send(testEmailUser)
      .end(function (err, res) {

        var token = res.body.token;
        console.log(res.body);
        if (!token) {
          request(app)
            .post('/api/v1/rents')
            .set('Accept', 'application/json')
            .query({access_token: token})
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
              if (err) return done(err);
              res.body.should.be.instanceof(Array);
              done();
            });
        }

      })
  })
})
