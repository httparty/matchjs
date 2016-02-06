;(function(){
  'use strict';

  angular.module('app.settings')
    .factory('settingsModel', function($http){
      var model = {};

      model.getPreferences = function(){
        return $http({
          method: 'GET',
          url: '/api/users/settings'
        })
        .then(function(responseObj){
          return responseObj;
        });
      };

      model.savePreferences = function(userObj){
        return $http({
          method: 'POST',
          url: '/api/users/settings',
          data: userObj
        }).then(function(responseObj){
          console.log('response obj', responseObj);
          return responseObj;
        });
      };

      return model;

  });
})();
