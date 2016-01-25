;(function() {
  'use strict';

  angular.module('app.connect',[])
  .controller('connectController', ['connectModel', function(connectModel) {

      var vm = this;
      vm.users = '';
      vm.pages = [1, 2, 3, 4, 5];

      vm.getAllUsers = function() {
        connectModel.getAllUsers().then(function(r) {
        console.dir(r.data);
        vm.users = r.data;
      });

    };

  }]);

})();
