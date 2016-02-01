angular.module('app', [
  'ui.router',
  'ui.bootstrap',
  'ngCookies',
  'app.auth',
  'app.profile',
  'app.navbar',
  'app.footer',
  'app.home',
  'app.connect',
  'app.inbox',
  'app.guidelines',
  'app.invitations'
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
      url: '/profile/:username'
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
    }) 
    .state('inbox/conversation', {
      templateUrl: 'app/components/inbox/inbox.html',
      controller: 'InboxController',
      url: '/inbox/conversation/:username'
    }) 
    .state('guidelines', {
      templateUrl: 'app/components/guidelines/guidelines.html',
      controller: 'GuidelinesController',
      url: '/guidelines'
    })
    .state('invitations', {
      templateUrl: 'app/components/invitations/invitations.html',
      controller: 'invitationsController',
      url: '/invitations/:username'
    });
  }])
  .run(['$rootScope','$state','$cookies','$window', 'AuthService', function($rootScope, $state, $cookies, $window, AuthService) {

    $rootScope.$on('$stateChangeStart', function(event, toState) {
      if (!AuthService.isAuthenticated() && toState.name !== 'home') {
        console.log('hello in isauth');
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
