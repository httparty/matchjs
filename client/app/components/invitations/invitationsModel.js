;(function(){
  'use strict';

  angular.module('app.invitations')
    .factory('invitationsModel', ['$http', function($http){
      var model = {};

      model.createInvitation = function(inviteObj){
        console.log(inviteObj);
        return $http({
          method: 'POST',
          url: '/api/invitations/createInvitation',
          data: inviteObj
        });
      };

      model.getInvitationsByMentor = function(username){
        return $http({
          method: 'GET',
          url: '/api/invitations/sender/' + username,
        });
      };

      model.getInvitationsByMentee = function(username){
        return $http({
          method: 'GET',
          url: '/api/invitations/recipient/' + username,
        });
      };

      model.deleteInvitation = function(inviteObj) {
        return $http({
          method: 'DELETE',
          url: '/api/invitations/invite/' + inviteObj.id + '/' + inviteObj.senderName + '/' + inviteObj.recipientName
        });
      };

      model.updateInvitation = function(inviteObj) {
        return $http({
          method: 'POST',
          url: '/api/invitations/sender/' + inviteObj.username, //updated by the sender/mentor
          data: inviteObj
        });
      };

      // model.declineInvitation = function(inviteObj) {
      //   return $http({
      //     method: 'POST',
      //     url: '/api/invitations/decline/recipient/' + inviteObj.username, //updated by the sender/mentor
      //     data: inviteObj
      //   });
      // };


    return model;
  }]);

})();
