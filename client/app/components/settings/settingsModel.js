;(function(){
  'use strict';

  angular.module('app.settings')
    .factory('settingsModel', function($http){
      var model = {};

      model.savePreferences = function(userObj){
        return $http({
          method: 'POST',
          url: '/api/users/settings/save/' + userObj.username
        });

      };

      model.editPreferences = function(userObj){
        return $http({
          method: 'GET',
          url: '/api/users/settings/edit/' + userObj.username
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
