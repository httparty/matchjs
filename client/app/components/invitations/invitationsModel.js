;(function(){
  'use strict';

  angular.module('app.invitations')
    .factory('invitationsModel', ['$http', function($http){
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

//NOTE TO RACHEL: - NEED NEW ROUTE FOR BELOW?
      model.deleteInvitation = function(inviteObj) {
        // return $http({
        //   method: 'GET',
        //   url: '/api/invitations/sender/' + inviteObj.id
        // });
      };

      model.updateInvitation = function(inviteObj) {
        return $http({
          method: 'POST',
          url: '/api/invitations/sender/' + inviteObj.username, //updated by the sender/mentor
          data: inviteObj
        });
      };
    
    return model;
  }]);

})();
