angular.module('app.footer', [])
  .controller('FooterController', ['$scope', 'AuthService', function($scope, AuthService){
    $scope.user = angular.fromJson(AuthService.getCurrentUser());

    $scope.isLoggedIn = function() {
      return AuthService.isAuthenticated();
    };

  }]);
