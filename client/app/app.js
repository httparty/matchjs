angular.module('app', [
  'ui.router',
  'app.home',
  'ngCookies'
  ])
  .config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('home', {
      templateUrl: 'app/components/home/home.html',
      url: '/'
    })
    .state('test', {
      templateUrl: 'app/components/test/test.html',
      url: '/test'
    })
  }]);