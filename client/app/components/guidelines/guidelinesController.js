;(function() {
  'use strict';

  angular.module('app.guidelines', [])
    .controller('GuidelinesController', ['$scope', 'AuthService', function($scope, AuthService){
      var vm = this;

      vm.isLoggedIn = function() {
        return AuthService.isAuthenticated();
      };
    }]);

})();