;(function(){
  'use strict';

  angular.module('app.invitations')
    .factory('inviationsModel', function($http){
      var model = {};

      model.createInviation = function(username){
        return $http({
          method: 'GET',
          url: '/api/invitations/createInvitation/' + username
        });
      };

      return model;
  });

})();
