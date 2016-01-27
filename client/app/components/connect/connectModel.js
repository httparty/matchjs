;(function() {
  'use strict';

  angular.module('app.connect')
  .factory('connectModel',function($http){
    var model = {};

    model.getAllUsersRec = function(username) {
      return $http({
      method: 'GET',
        url: '/api/users/getAllUsersRec/' + username
      });
    };

    model.getAllUsers = function() {
      return $http({
      method: 'GET',
        url: '/api/users/getAllUsers'
      });
    };

    model.getThisUserProfile = function(username) {
      return $http({
      method: 'GET',
        url: '/userProfile/' + username
      }).then(function(response) {
        return response;
      });
    };

    return model;
  });

})();
