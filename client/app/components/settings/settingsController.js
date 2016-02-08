;(function(){
  'use strict';
  angular.module('app.settings', [])
  .controller('SettingsController', [
    'settingsModel', '$state', 'Profile', 'AuthService', function(settingsModel, $state, Profile, AuthService){

    var vm = this;
    vm.username = $state.params.username;
    vm.blockEditing = true;
    vm.username = angular.fromJson(AuthService.getCurrentUser()).username;

    Profile.getUserProfile({username: vm.username}).then(function(response){
      vm.currentUserProfile = response.data;
      vm.wantFollowerEmails = vm.currentUserProfile.wantFollowerEmails;
      vm.wantInvitationEmails = vm.currentUserProfile.wantInvitationEmails;
      vm.wantChatEmails = vm.currentUserProfile.wantChatEmails;
    });

    //Allows user to edit preferences page
    vm.editPreferences = function() {
      vm.blockEditing = !vm.blockEditing;
    };

    //Saves user preferences
    vm.savePreferences = function() {
      vm.editPreferences();
      settingsModel.savePreferences({wantFollowerEmails: vm.wantFollowerEmails, wantChatEmails: vm.wantChatEmails, wantInvitationEmails: vm.wantInvitationEmails});
    };

  }]);
})();
