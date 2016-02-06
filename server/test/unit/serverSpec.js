var expect = require('chai').expect;
var request = require('supertest');
var express = require('express');
var app = express();

var middleware = require('../../config/middleware');
var _ = require('underscore');

middleware(app, express);
//auth
//api/users
//api/inbox
//api/email
//api/invitations

describe('Server Spec', function() {

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


describe('Invitation Routes Tests', function(){ //'/api/invitations'
  var invite = {};
  invite.menteeEmail = 'mentee@yahoo.com';
  invite.mentorEmail = 'mentor@yahoo.com';
  invite.mentee = 'John Doe';
  invite.mentor = 'Jane Doe';
  invite.mentorUsername = "spiterman"
  invite.menteeUsername = "polinadotio";
  invite.sessionInfo = {
    where: 'San Francisco',
    when: '2016-01-30T04:15:00.000Z',
    summary: 'Some summary'
  };

  describe('Creating New Invitations', function(){

    var expectedResult = { id: 0, //ID changes on each new invite
          UserId: 2,
          senderName: 'spiterman',
          recipientName: 'polinadotio',
          when: '2016-01-30T04:15:00.000Z',
          location: 'San Francisco',
          summary: 'Some summary',
          updatedAt: '2016-02-05T00:05:07.419Z',
          createdAt: '2016-02-05T00:05:07.419Z' };

    // it('should create a new invitation', function(done){
    //   request(app)
    //     .post('/api/invitations/createInvitation')
    //     .send(invite)
    //     .expect(200)
    //     .end(function(err, res){
    //       if(err){throw err;}
    //       expect(typeof res.body).to.equal('object');
    //       expect(res.body.location).to.equal(expectedResult.location);
    //       expect(res.body.summary).to.equal(expectedResult.summary);
    //       expect(res.body.senderName).to.equal(expectedResult.senderName);
    //       expect(res.body.recipientName).to.equal(expectedResult.recipientName);
    //       done();
    //     });
    // });
  });

  describe('Updating Invitations', function(){
    var updatedInvite = {
      date: '2017-01-30T04:15:00.000Z',
      when: '2017-01-30T04:15:00.000Z',
      username: 'user1',
      id: 33,
      mentee: 'user2'
    }

//In Progress
    // it('should update a new invitation', function(done){
    //   request(app)
    //     .post('/api/invitations/createInvitation')
    //     .send(invite)
    //     .post('/api/invitations/sender/user1')
    //     .send(updatedInvite) //Fill this out
    //     .expect(200)
    //     .end(function(err, res){
    //       if(err){throw err;}
    //       expect(true).to.equal(true);
    //       done();
    //     });
    // });

  });

  describe('/api/users routes', function() {

    // it('it gets a user profile', function(done) {

    //   request(app)
    //     .get('/api/users/userProfile/polinadotio')
    //     .expect(200)
    //     .end(function(err, res) {
    //       if (err) {
    //         throw err;
    //       }
    //       done();
    //     });
    // });
  });

  describe('/api/invitations routes', function(){

    // it('it gets the invitation page', function(done){
    //   request(app)
    //     .get('/api/users/getAllUsersRec/spiterman')
    //     .expect(200)
    //     .end(function(err, res){
    //       if(err){throw err;}
    //       done();
    //     });
    // });
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
    // it('it gets the invitation page', function(done){
    //   request(app)
    //     .post('/api/invitations/createInvitation')
    //     .send(invite)
    //     .expect(200)
    //     .end(function(err, res){
    //       if(err){throw err;}
    //       // expect(res).to.exist;
    //       // expect(res.status).to.equal(200);
    //       done();
    //     });
    // });
  });


});

describe('/api/addPadawan', function(){



});

describe('User Routes Tests', function(){

  // describe('Save User Email Preferences', function(){
  //   it('should be able to save user email preferences', function(done){

  //     var emailObj = {wantFollowerEmails: true, wantChatEmails: true, wantInvitationEmails: true}

  //     request(app)
  //       .post('/api/users/settings')
  //       .send(emailObj)
  //       .expect(200)
  //       .end(function(err, res){
  //         if(err){throw err;}
  //         done();
  //       });


  //   });


  // }); //End save user email preferences


}); //End User routes tests


});
