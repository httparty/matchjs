angular.module('app.navbar', [])
  .directive('navDir', function(){
    return {
      templateUrl: 'app/components/shared/navbar/_navbar.html'
      // controller: ['$scope', function($scope){
      //   $scope.Message = 'Hello World';
      // }]   //Still not working
    };
  });
