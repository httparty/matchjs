;(function() {
  'use strict';

  angular.module('app.connect',[])
  .controller('connectController', ['connectModel', 'AuthService', '$state', function(connectModel, AuthService, $state) {

      var vm = this;
      vm.users = '';
      vm.pages = [1, 2, 3, 4, 5];
      var current_user = angular.fromJson(AuthService.getCurrentUser());
      var username = current_user.username;

      vm.getAllUsersRec = function() {
        connectModel.getAllUsersRec(username).then(function(r) {
        console.dir(r.data);
        vm.users = r.data;
        });
      };

      vm.getAllUsers = function() {
        connectModel.getAllUsers().then(function(r) {
        console.dir(r.data);
        vm.users = r.data;
        });
      };

      //consider moving this to profile model 
      vm.getThisUserProfile = function(username) {
        console.log('in connectController: user', username);
        $state.go('profile', {username: username});
      };
    
  }]);

})();
