angular.module('app', [
  'ui.router',
  'ngCookies',
  'app.profile',
  'app.navbar'
  'app.home',
  'app.profile',
  'app.auth'
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
    });
  }])
  .run(['$rootScope','$state','$cookies','$window', 'AuthService', function($rootScope, $state, $cookies, $window, AuthService) {
    
    $rootScope.$on('$stateChangeStart', function(event, toState) { 

      console.log(AuthService.getCurrentUser());

      if (!AuthService.isAuthenticated() && toState.name === 'home') {
        return;
      }

      if (!AuthService.isAuthenticated() && toState.name !== 'home') {
        event.preventDefault(); 
        $state.go('home');
        return;
      }

    });
  }]);
