;(function(){
  'use strict';

  angular.module('app.invitations')
    .factory('invitationsModel', function($http){
      var model = {};

      model.createInvitation = function(inviteObj){
        return $http({
          method: 'POST',
          url: '/api/invitations/createInvitation',
          data: inviteObj
        });
      };

      return model;
  });

})();
