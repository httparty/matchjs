'use strict';

describe('Controller: ProfileController', function() {

  var $httpBackend;
  var AuthService;
  var $rootScope;
  var $window;
  var $state;
  var Profile;
  var $sce;
  var invitationsModel;
  var $location;
  var $controller;
  var $scope;

  beforeEach(module('app'));
  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $scope = $rootScope.$new();
    $httpBackend = $injector.get('$httpBackend');
    $controller = $injector.get('$controller');
    AuthService = $injector.get('AuthService');
    invitationsModel = $injector.get('invitationsModel');
    $state = $injector.get('$state');
    Profile = $injector.get('Profile');

  }));

  afterEach(function() {

  });

  describe('Profile Model Testing', function(){

    describe('Basic Tests', function(){

      it('should be an object', function(){
        expect(typeof Profile).toBe('object');
      });

      it('should have a getUserProfile method', function() {
        expect(typeof Profile.getUserProfile).toBe('function');
      });

      it('should have an updateProfile method', function(){
        expect(typeof Profile.updateProfile).toBe('function');
      });

      it('should have an addPadawan method', function(){
        expect(typeof Profile.addPadawan).toBe('function');
      });
      //Make sure it has all the other methods

    });//End Basic Tests

    });//End Profile Model Testing



  // describe('', function() {
  //   it('should...', function() {

  //   });

  //   it('should equal...', function() {
  //     expect('x').toBe('x');
  //   });

  // });

});
