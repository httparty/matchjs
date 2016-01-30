;(function(){
  'use strict';

  angular.module('app.settings')
    .factory('settingsModel', function($http){
      var model = {};

      model.savePreferences = function(settingsObj){
        return $http({
          method: 'POST',
          url: '/api/settings/save' + settingsObj.username
        });

      };

      model.editPreferences = function(settingsObj){
        return $http({
          method: 'GET',
          url: '/api/settings/edit' + settingsObj.username
        });
      };

  });
})();
