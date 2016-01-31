;(function(){
  'use strict';
  angular.module('app.settings', [])
  .controller('settingsController', [
    'settingsModel', '$state', function(settingsModel, $state){

    var vm = this;
    vm.username = $state.params.username;

    //Allows user to edit preferences page
    vm.editPreferences = function() {

    };

    //Saves user preferences
    vm.savePreferences = function() {

    };

    vm.deleteAccount = function() {
      console.log('Account Deleted');
      if(confirm('Are you sure you want to delete your account?')){
        settingsModel.deleteAccount({username: vm.username});
      }
    };

  }]);
})();
