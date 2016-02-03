;(function(){
  'use strict';
  angular.module('app.settings', [])
  .controller('SettingsController', [
    'settingsModel', '$state', 'Profile', function(settingsModel, $state, Profile){

//*** SCOPE VARIABLES ***//
    var vm = this;
    vm.username = $state.params.username;
    vm.blockEditing = true;
    // vm.wantEmails = true;
    //vm.wantEmails = vm.userPreferences.wantEmails, what we want after routes are set up
    Profile.getUserProfile({username: vm.username}).then(function(response){
      vm.currentUserProfile = response.data;
      vm.wantEmails = vm.currentUserProfile.wantEmails;
      console.log(vm.currentUserProfile);
    });
    // console.log(vm.currentUserProfile)


//*** BASIC PREFERENCE MANIPULATION FUNCTIONS ***//

    //Loads a users preferences
    // vm.getPreferences = function() {
    //   vm.userPreferences = settingsModel.getPreferences(); //vm.userPreferences is the object getting passed around
    //   //this should return {wantEmails: true or false};
    // };

    //Allows user to edit preferences page
    vm.editPreferences = function() {
      vm.blockEditing = !vm.blockEditing;
    };

    //Saves user preferences
    vm.savePreferences = function() {
      console.log("Preferences have been saved!");
      vm.editPreferences();
      settingsModel.savePreferences({wantEmails: vm.wantEmails});
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
