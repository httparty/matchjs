;(function(){
  'use strict';

  angular.module('app.settings')
    .factory('settingsModel', function($http){
      var model = {};

      model.savePreferences = function(userObj){
        return $http({
          method: 'POST',
          url: '/api/settings/save/' + userObj.username
        });

      };

      model.editPreferences = function(userObj){
        return $http({
          method: 'GET',
          url: '/api/settings/edit/' + userObj.username
        });
      };

      model.deleteAccount = function(userObj){
        return $http({
          method: 'GET',    //Change to delete eventually
          url: '/api/settings/deleteAccount/' + userObj.username    //May need to add username property on top
        });
      };

      return model;

  });
})();
