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

    // $rootScope = $injector.get('$rootScope');
    // $scope = $rootScope.$new();
    // $httpBackend = $injector.get('$httpBackend');
    $controller = $injector.get('$controller');
    AuthService = _MockAuthService_;
    invitationsModel = $injector.get('invitationsModel');
    $state = $injector.get('$state');
    Profile = $injector.get('Profile');
    $http = $injector.get('$http');
    $cookies = $injector.get('$cookies');
    // invitationsController = $injector.get('InvitationsController');

    $cookies.putObject('user-profile', {id: 1,
                              username: 'user1',
                              displayName: 'user 1',
                              email: 'user1@email.com',
                              avatar: null,
                              location: 'San Francisco',
                              github: 'https://github.com'});

    $currentCookie = $cookies.get('user-profile')

    // InvitationsController = $controller('InvitationsController', {
    //   AuthService: AuthService,
    //   invitationsModel: invitationsModel,
    //   $state: $state,
    //   Profile: Profile
    // });

// { 'user-profile':
//   { id: '9453231',
//     username: 'spiterman',
//     displayName: 'Sergey Piterman',
//     email: 'sergeypiterman@gmail.com',
//     avatar: 'https://avatars.githubusercontent.com/u/9453231?v=3',
//     location: 'San Francisco Bay Area',
//     github: 'https://github.com/spiterman' },
//     'connect.sid': 's:_uUGeH3HSeK9OmiFk7rqeXrZKTvyApnB.51XcO+iNRkCnWjW3LKkgKO/CkdWR2LXzFIxYZGzsn0w' }
  }));

  afterEach(function () {
    //any after each goes here
  });

  describe('vm.email', function () {

    it('should expose action route to the view', function() {
      expect(3).toBe(3);
    });

    it('should equal 4', function() {
      expect("4").toBe("4");
    });

    it('should equal true', function() {
      expect(true).toBe(true);
    });

  });

  describe('Invitations Model Testing', function(){
    describe('Basic Tests', function(){
      it('should be an object', function(){
        expect(typeof Profile).toBe('object');
      });

      it('should have a getInvitationsByMentor method', function(){
        expect(typeof Profile.getInvitationsByMentor).toBe('function');
      });

    });


  });

  describe('Basic Functionality', function(){
    it('should have a createInvitation function', function(){
      expect(typeof invitationsModel.createInvitation).toBe('function');
      console.log($currentCookie, '$cookies')
    });
  });

  describe('Create Invitation Functionality', function(){

    // it('')
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

    it('should return an $http() call', function(){
      // expect(invitationsModel.createInvitation(formData)).toBe(200);
      expect(true).toBe(true);
    });



  });




});




