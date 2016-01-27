;(function(){
  'use strict';
  angular.module('app.invitations', [])
  .controller('invitationsController', ['invitationsModel', 'AuthService', '$state', 'Profile', function(invitationsModel, AuthService, $state, Profile){

    var vm = this;

    var current_user = angular.fromJson(AuthService.getCurrentUser());

    vm.username = current_user.username;

    vm.recipient = $state.params.username;

    Profile.getUserProfile($state.params).then(function(response){

      vm.recipientProfile = response.data;
    });

    vm.formData = {};

    vm.createInvitation = function() {
      console.log('Invitation Submitted!');
      vm.formData.mentor = vm.username;
      vm.formData.mentee = vm.recipient;
      vm.formData.sessionInfo.when = new Date();
      console.dir(vm.formData);
      invitationsModel.createInvitation(vm.formData)
        .then(function(r){
          console.dir(r.data);
          vm.formData = {};
        });

      // .then(function(r){
      //   console.dir(r.data);
      //   vm.user = r.data;
      // });
    };

  }]);
})();
