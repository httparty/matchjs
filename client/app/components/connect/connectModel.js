;(function() {
  'use strict';

  angular.module('app.connect')
  .factory('connectModel',function($http){
    var model = {};

    model.getAllUsers = function() {
      return $http({
      method: 'GET',
        url: '/api/users/getAllUsers'
      });
    };

    return model;
  });
  
})();