angular.module('app.navbar')
  .directive('navDir', function(){
    return {
      templateUrl: 'app/components/shared/navbar/navbar.html'
      // controller: ['$scope', function($scope){
      //   $scope.Message = 'Hello World';
      // }]   //Still not working
    };
  });
