;(function() {
  'use strict';

  angular.module('app.auth', [])
    .controller('AuthController', ['$scope', function($scope) {
      var vm = this;
      vm.email = '';

      $scope.submitEmail = function() {
        if (vm.email !== undefined) {
          console.log("submitted email", vm.email);
        }
      }

    }]);
})();