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
          return responseObj;
        });
      };

      model.deleteAccount = function(userObj){
        return $http({
          method: 'DELETE',    //Change to delete eventually
          url: '/api/users/settings/deleteAccount/' + userObj.username    //May need to add username property on top
        });
      };

      return model;

  });
})();
