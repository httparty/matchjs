angular.module('app', [
  'ui.router',
  'ngCookies',
  'app.auth',
  'app.profile',
  'app.navbar',
  'app.footer',
  'app.home',
  'app.connect',
  'app.inbox',
  'app.guidelines'
  // 'firebase'
  ])
  .config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('home', {
      templateUrl: 'app/components/home/home.html',
      // controller: 'HomeController',
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
    })
    .state('inbox', {
      templateUrl: 'app/components/inbox/inbox.html',
      controller: 'InboxController',
      url: '/inbox'
    }) //;
    .state('guidelines', {
      templateUrl: 'app/components/guidelines/guidelines.html',
      controller: 'GuidelinesController',
      url: '/guidelines'
    });
  }])
  .run(['$rootScope','$state','$cookies','$window', 'AuthService', function($rootScope, $state, $cookies, $window, AuthService) {

    $rootScope.$on('$stateChangeStart', function(event, toState) {

      if (!AuthService.isAuthenticated() && toState.name !== 'home') {
        event.preventDefault();
        $state.go('home');
        return;
      }

      if (AuthService.isAuthenticated() && toState.name === 'home') {
        event.preventDefault();
        $state.go('connect');
        return;
      }

    });
  }]);
