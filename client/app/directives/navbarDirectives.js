angular.module('app.navbarDirectives', [])
  .directive('nav-dir', function(){
    return {
      // restrict: 'E',
      // templateURL: 'app/partials/_navbar.html'
      template : "<h1>Made by a directive!</h1>"
      // controller: ['$scope', function($scope){
      //   $scope.Message = 'Hello World';
      // }]
    };
  });
