;(function() {
  'use strict';

  angular.module('app.connect',[])
  .controller('connectController', ['connectModel', 'AuthService', function(connectModel, AuthService) {

      var vm = this;
      vm.users = '';
      vm.pages = [1, 2, 3, 4, 5];
      var current_user = angular.fromJson(AuthService.getCurrentUser());
      var username = current_user.username;

      vm.getAllUsers = function() {
        connectModel.getAllUsers(username).then(function(r) {
        console.dir(r.data);
        vm.users = r.data;
      });

    };

  }]);

})();
