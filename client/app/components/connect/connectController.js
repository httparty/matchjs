;(function() {
  'use strict';

  angular.module('app.connect',[])
  .controller('connectController', function($scope,connectModel) {
      $scope.getAllUsers = function() {
        connectModel.getAllUsers().then(function(r) {
        console.dir(r.data);
        $scope.users = r.data;
      });
    };

    $scope.getAllUsers();
    
  });

})();