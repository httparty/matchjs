;(function(){
  'use strict';
  angular.module('app.settings', [])
  .controller('settingsController', [
    'settingsModel', function(settingsModel){

    var vm = this;

    //Allows user to edit preferences page
    vm.editPreferences = function() {

    };

    //Saves user preferences
    vm.savePreferences = function() {

    };

  }]);
})();
