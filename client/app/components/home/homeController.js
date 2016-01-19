angular.module('app.home', [])
  .controller('HomeController', ['$scope', function ($scope) {
    $scope.Name = "Sergey";
    $scope.Square = function(x) { return x * x};

  }]);
