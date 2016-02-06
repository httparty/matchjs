'use strict';

angular.module('mock.connect-service', []).
  factory('MockConnectService', function() {
    var MockConnectService = {};

    MockConnectService.getAllUsersRec = function() {
      return true;
    };
    
    MockConnectService.getAllUsers = function() {
      return true;
    };

    MockConnectService.getThisUserProfile = function() {
      return true;
    };

    MockConnectService.searchUsers = function() {
      return true;
    };
    
    return MockConnectService;
});