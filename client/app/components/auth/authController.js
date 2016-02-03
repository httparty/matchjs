;(function() {
  'use strict';

  angular.module('app.auth', [])
    .controller('AuthController', ['$scope','AuthService', function($scope, AuthService) {
      
      var vm = this;
      vm.email = '';
      vm.action = '/auth/email/';

    }]);
})();