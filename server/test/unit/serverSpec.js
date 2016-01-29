var expect = require('chai').expect;
var request = require('supertest');
var express = require('express');
var app = express();
var middleware = require('../../config/middleware');

middleware(app, express);

describe('Server Spec', function() {

  it('it gets the resource route', function(done) {

    request(app)
      .get('/resource')
      .expect(302)
      .end(function(err, res) {
        if (err) {
          throw err;
        }
        done();
      });
  });

  describe('/api/users routes', function() {

    it('it gets a user profile', function(done) {

      request(app)
        .get('/api/users/userProfile/polinadotio')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            throw err;
          }
          done();
        });
    });
  });
});
