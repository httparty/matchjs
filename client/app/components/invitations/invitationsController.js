;(function(){
  'use strict';
  angular.module('app.invitations', [])
  .controller('invitationsController', ['invitationsModel', 'AuthService', '$state', 'Profile', function(invitationsModel, AuthService, $state, Profile){

    var vm = this;

    var current_user = angular.fromJson(AuthService.getCurrentUser());
    var username = current_user.username;

    vm.recipient = $state.params.username;

    Profile.getUserProfile($state.params).then(function(response){

      vm.recipientProfile = response.data;
    })

    vm.createInvitation = function() {
      console.log('Invitation Submitted!');
      invitationsModel.createInvitation(username)
      .then(function(r){
        console.dir(r.data);
        vm.user = r.data;
      });
    };

  }]);
})();
