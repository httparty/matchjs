;(function() {
  'use strict';

  angular.module('app.connect')
  .factory('connectModel',function($http){
    var model = {};

    model.getAllUsers = function(username) {
      return $http({
      method: 'GET',
        url: '/api/users/getAllUsers/' + username
      });
    };

    return model;
  });

})();
