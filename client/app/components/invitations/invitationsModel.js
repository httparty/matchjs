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

      model.getInvitationsByMentor = function(inviteObj){
        return $http({
          method: 'GET',
          url: '/api/invitations/sender/' + inviteObj.username,
        });
      };

      model.getInvitationsByMentee = function(inviteObj){
        return $http({
          method: 'GET',
          url: '/api/invitations/recipient/' + inviteObj.username,
        });
      };

      model.deleteInvitationByInvitationID = function(inviteObj){
      };

      return model;
  });

})();