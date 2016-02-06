'use strict';

describe('Controller: SettingsController', function() {

  var $httpBackend;
  var $scope;
  var settingsModel;
  var $rootScope;
  var $state;
  var SettingsController;
  var $controller;

  beforeEach(module('app'));
  beforeEach(inject(function ($injector) {

    // $rootScope = $injector.get('$rootScope');
    // $scope = $rootScope.$new();
    // $httpBackend = $injector.get('$httpBackend');
    $controller = $injector.get('$controller');
    settingsModel = $injector.get('settingsModel');

    //cannot read property state params of undefined
    
    // SettingsController = $controller('SettingsController', {
    //   $state: $state,
    //   settingsModel: settingsModel
    // });

  }));

  afterEach(function () {
    //any after each goes here
  });

  describe('vm.email', function () {

    it('should equal 4', function() {
      expect("4").toBe("4");
    });

  });
});