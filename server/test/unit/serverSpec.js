var expect = require('chai').expect;
var request = require('supertest');
var express = require('express');
var app = express();
var middleware = require('../../config/middleware');

middleware(app, express);
//auth
//api/users
//api/inbox
//api/email
//api/invitations

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

  describe('/api/invitations routes', function(){

    it('it gets the invitation page', function(done){
      request(app)
        .get('/api/users/getAllUsersRec/spiterman')
        .expect(200)
        .end(function(err, res){
          if(err){throw err;}
          done();
        });
    });
  });


describe('/api/invitations routes', function(){

    var invite = {};
    invite.menteeEmail = 'mentee@yahoo.com';
    invite.mentorEmail = 'mentor@yahoo.com';
    invite.mentee = 'John Doe';
    invite.mentor = 'Jane Doe';
    invite.mentorUsername = "user1"
    invite.menteeUsername = "user2";
    invite.sessionInfo = {
      location: 'San Francisco',
      when: '2016-01-30T04:15:00.000Z',
      summary: 'Some summary'
    };
    it('it gets the invitation page', function(done){
      request(app)
        .post('/api/invitations/createInvitation')
        .send(invite)
        .expect(200)
        .end(function(err, res){
          if(err){throw err;}
          // expect(res).to.exist;
          // expect(res.status).to.equal(200);
          done();
        });
    });
  });

describe('/api/addPadawan', function(){



})

});
