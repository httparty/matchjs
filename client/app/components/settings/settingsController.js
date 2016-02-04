;(function(){
  'use strict';
  angular.module('app.settings', [])
  .controller('SettingsController', [
    'settingsModel', '$state', 'Profile', 'AuthService', function(settingsModel, $state, Profile, AuthService){

//*** SCOPE VARIABLES ***//
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

//*** BASIC PREFERENCE MANIPULATION FUNCTIONS ***//

    //Allows user to edit preferences page
    vm.editPreferences = function() {
      vm.blockEditing = !vm.blockEditing;
    };

    //Saves user preferences
    vm.savePreferences = function() {
      console.log("Preferences have been saved!");
      vm.editPreferences();
      settingsModel.savePreferences({wantFollowerEmails: vm.wantFollowerEmails, wantChatEmails: vm.wantChatEmails, wantInvitationEmails: vm.wantInvitationEmails});
    };


//*** DELETE ACCOUNT FUNCTIONALITY ***//

    //Deletes a user account
    vm.deleteAccount = function() {
      console.log('Account Deleted');
      if(confirm('Are you sure you want to delete your account?')){
        settingsModel.deleteAccount({username: vm.username});
      }
    };

  }]);
})();
