;(function(){
  'use strict';

  angular.module('app.invitations')
    .factory('invitationsModel', function($http){
      var model = {};

      model.createInvitation = function(username){
        return $http({
          method: 'POST',
          url: '/api/invitations/createInvitation/' + username
          //Data
        });
      };

      return model;
  });

})();
