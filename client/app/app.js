angular.module('app', [
  'ui.router',
  'ngCookies',
  'app.auth',
  'app.profile',
  'app.navbar',
  'app.home',
  'app.connect'
  ])
  .config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('home', {
      templateUrl: 'app/components/home/home.html',
      url: '/'
    })
    .state('profile', {
      templateUrl: 'app/components/profile/profile.html',
      controller: 'ProfileController',
      url: '/profile'
    })
    .state('connect', {
      templateUrl: 'app/components/connect/connect.html',
      controller: 'connectController',
      url: '/connect'
    });
  }])
  .run(['$rootScope','$state','$cookies','$window', 'AuthService', function($rootScope, $state, $cookies, $window, AuthService) {
    
    $rootScope.$on('$stateChangeStart', function(event, toState) { 

      // console.log(AuthService.getCurrentUser());

      if (!AuthService.isAuthenticated() && toState.name !== 'home') {
        event.preventDefault(); 
        $state.go('home');
        return;
      }
    });
  }]);
