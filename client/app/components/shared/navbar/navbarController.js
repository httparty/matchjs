angular.module('app.navbar', [])
  .controller('NavController', ['$scope', 'AuthService', function ($scope, AuthService) {

    $scope.user = angular.fromJson(AuthService.getCurrentUser());

    // $scope.user = AuthService.getCurrentUser();

    $scope.isLoggedIn = function() {
      return AuthService.isAuthenticated();
    }

  }]);