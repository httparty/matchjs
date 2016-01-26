;(function(){
  'use strict';
  angular.module('app.invitations', [])
  .controller('invitationsController', ['invitationsModel', 'AuthService', function(invitationsModel, AuthService){

    var vm = this;
    vm.user = '';
    var current_user = angular.fromJson(AuthService.getCurrentUser());
    var username = current_user.username;

    vm.createInvitation = function() {
      invitationsModel.createInvitation(username)
      .then(function(r){
        console.dir(r.data);
        vm.user = r.data;
      });
    };

  }]);
})();
