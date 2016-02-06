'use strict';

angular.module('mock.auth-service', []).
  factory('MockAuthService', function() {
    var MockAuthService = {};

    MockAuthService.isAuthenticated = function() {
      return true;
    };
    
    MockAuthService.getCurrentUser = function() {
      var mockCookieObj = { username: 'vivario'};
      return JSON.stringify(mockCookieObj);
    };
    
    return MockAuthService;
});

  