'use strict';

describe('Controller: InvitationsController', function() {

  var $httpBackend;
  var AuthService;
  var $rootScope;
  var invitationsModel;
  var $state;
  var Profile;
  var $http;
  var $cookies;
  var invitationsController;
  var $currentCookie;

  beforeEach(module('app'));
  beforeEach(module('mock.auth-service'));
  beforeEach(inject(function ($injector, _MockAuthService_) {

    $rootScope = $injector.get('$rootScope');
    $scope = $rootScope.$new();
    $httpBackend = $injector.get('$httpBackend');
    $controller = $injector.get('$controller');
    AuthService = _MockAuthService_;
    invitationsModel = $injector.get('invitationsModel');
    $state = $injector.get('$state');
    Profile = $injector.get('Profile');
    $http = $injector.get('$http');
    $cookies = $injector.get('$cookies');


    InvitationsController = $controller('invitationsController', {
      AuthService: AuthService,
      invitationsModel: invitationsModel,
      $state: $state,
      Profile: Profile,
      $scope: $scope
    });

    InvitationsController.formData = {};
    InvitationsController.formData.sessionInfo = {};


//Data that gets passed into the createInvitation function
    InvitationsController.currentUserProfile = {wantInvitationEmails: true}

        InvitationsController.recipientProfile = {wantInvitationEmails: true}

    InvitationsController.name = 'Jane';
    InvitationsController.username = 'Jane1';
    InvitationsController.recipientName = 'Jay';
    InvitationsController.recipientUsername = 'Jay1';
    InvitationsController.date = new Date();
    InvitationsController.submitted = false;
    InvitationsController.roundTime();

  }));

  afterEach(function () {
    //any after each goes here
  });


  // *** Controller Variables *** //

  describe('Controller Variables', function(){

    it('it should contain a current user and username', function(){
      expect(InvitationsController.username).toBeDefined();
      expect(angular.isString(InvitationsController.username)).toBe(true);
      expect(InvitationsController.name).toBeDefined();
      expect(angular.isString(InvitationsController.name)).toBe(true);
    });

    it('it should contain a date variables', function(){
      expect(InvitationsController.date).toBeDefined();
      expect(typeof InvitationsController.date).toBe('object');
      expect(InvitationsController.minDate).toBeDefined();
      expect(InvitationsController.maxDate).toBeDefined();
      expect(InvitationsController.ismeridian).toBe(true);
      expect(angular.isNumber(InvitationsController.hstep)).toBe(true);
      expect(angular.isNumber(InvitationsController.mstep)).toBe(true);
    });

    it('it should have a form that hasn\'t been submitted', function(){
      expect(typeof InvitationsController.submitted).toBeDefined();
      expect(InvitationsController.submitted).toBe(false);
    });


    it('it should contain date options', function(){
      expect(typeof InvitationsController.dateOptions).toBe('object');
      expect(InvitationsController.dateOptions.formatYear).toBe('yy');
      expect(InvitationsController.dateOptions.startingDay).toBe(1);
    });

    it('it should have date formatting options', function(){
      expect(angular.isArray(InvitationsController.formats)).toBe(true);
      expect(InvitationsController.format).toBe('dd-MMMM-yyyy');
    });

  });


  describe('Invitations Helper Functions', function(){
    it('it should have a clear function that resets the date', function(){
      expect(typeof InvitationsController.clear).toBe('function');
      var t1 = InvitationsController.date;
      InvitationsController.clear();
      var t2 = InvitationsController.date;
      expect(t1).not.toBe(t2);
    });

    it('it should have and openCalendar function, and the calendar should start closed', function(){
      expect(InvitationsController.isCalendarOpen).toBe(false);
      InvitationsController.openCalendar();
      expect(InvitationsController.isCalendarOpen).toBe(true);
    });

    it('it should round the minutes correctly', function(){
      expect(typeof InvitationsController.roundTime).toBe('function');
      expect(InvitationsController.date.getMinutes() % 15).toBe(0);
    });

    it('it should not submit the form if there are empty fields', function(){
      expect(InvitationsController.attemptSubmit).toBeDefined();
      expect(typeof InvitationsController.attemptSubmit).toBe('function');
      expect(InvitationsController.attemptSubmit()).toBe(false);
      InvitationsController.formData.sessionInfo.summary = "Not much";
      InvitationsController.formData.sessionInfo.where = "SF";
      expect(InvitationsController.attemptSubmit()).toBe(true);
    });

  }); //End helper functions

  describe('Create Invitation Functionality', function(){

    var date = new Date();
    var formData = {
      mentee: "user2",
      menteeEmail: "user2@email.com",
      menteeEmailPreferences: false,
      menteeUsername: "user2",
      mentor: "Sergey Piterman",
      mentorEmail: "sergeypiterman@gmail.com",
      mentorEmailPreferences: true,
      mentorUsername: "spiterman",
      sessionInfo: {summary: "asdfasdf",
      when: date,
      where: "asdfasdf"}
    };
  }); //End Create Invitation Functionality

  describe('Invitations Model Testing', function(){
    it('should be an object', function(){
      expect(typeof Profile).toBe('object');
    });

    it('it should have a createInvitation method', function(){
      expect(typeof invitationsModel.createInvitation).toBe('function');
    });

    it('it should have a getInvitationsByMentor method', function(){
      expect(typeof invitationsModel.getInvitationsByMentor).toBe('function');
    });

    it('it should have a getInvitationsByMentee method', function(){
      expect(typeof invitationsModel.getInvitationsByMentee).toBe('function');
    });

    it('it should have a deleteInvitation method', function(){
      expect(typeof invitationsModel.deleteInvitation).toBe('function');
    });

    it('it should have an updateInvitation method', function(){
      expect(typeof invitationsModel.updateInvitation).toBe('function');
    });
  });

}); //End Invitations-Controller Specs
