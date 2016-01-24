;(function() {
  'use strict';

  angular.module('app.navbar', [])
    .controller('NavController', ['AuthService', function (AuthService) {
      var vm = this;

      vm.user = angular.fromJson(AuthService.getCurrentUser());

      vm.isLoggedIn = function() {
        return AuthService.isAuthenticated();
      };

    }]);
})();