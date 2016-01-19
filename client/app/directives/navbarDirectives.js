angular.module('app.navbarDirectives', [])
  .directive('navDir', function(){
    return {
      templateUrl: 'app/partials/_navbar.html'
      // controller: ['$scope', function($scope){
      //   $scope.Message = 'Hello World';
      // }]   //Still not working
    };
  });
