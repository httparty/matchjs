;(function(){
  'use strict';
  angular.module('app.invitations', [])
  .controller('invitationsController', ['invitationsModel', 'AuthService', '$state', function(invitationsModel, AuthService, $state){

    var vm = this;
    // vm.user = '';
    var current_user = angular.fromJson(AuthService.getCurrentUser());
    var username = current_user.username;

    vm.recipient = $state.params.username;

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
