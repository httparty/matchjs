angular.module('app', [
  'ui.router',
  'app.home'
  ])
  .config(['$stateProvider','$urlRouterProvider','$httpProvider', function($stateProvider, $urlRouterProvider, $httpProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('home', {
      templateUrl: 'app/components/home/home.html',
      url: '/'
    })
  }])