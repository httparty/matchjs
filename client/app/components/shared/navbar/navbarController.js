;(function() {
  'use strict';

  angular.module('app.navbar', [])
    .controller('NavController', ['AuthService', '$state', function (AuthService, $state) {
      var vm = this;

      vm.user = angular.fromJson(AuthService.getCurrentUser());

      vm.isLoggedIn = function() {
        return AuthService.isAuthenticated();
      };

      //DRY refactor needed: this function is copied over from connectController
      vm.getThisUserProfile = function(username) {
        console.log('in navbarController: user', username);
        $state.go('profile', {username: username});
      };

    }]);
})();