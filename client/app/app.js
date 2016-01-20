angular.module('app', [
  'ui.router',
  'app.home',
  'ngCookies',
  'app.profile',
  'app.navbar'
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
    .state('profile', {
      templateUrl: 'app/components/profile/profile.html',
      controller: 'ProfileController',
      url: '/profile'
    });
  }])
  .run(['$rootScope','$state','$cookies','$window', function($rootScope, $state, $cookies, $window) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {

      var s = $cookies.get('user-profile');
      if (s) {
        var profileObj = s.substring(s.indexOf('{'), s.lastIndexOf('}') + 1);
        console.log('profile', profileObj);
      }

      var cookie = $cookies.get('connect.sid');
      console.log('cookie', cookie);

      if(!cookie && toState.name === 'home') {
        console.log('hey I"m logged out');
        return;
      } else if (!cookie && toState.name !== 'home') {
        console.log('I"m still logged out in another page');
        event.preventDefault();
        $state.go('home');
        return;
      } else {
        console.log('hey I"m logged in');
      }
    });
  }]);
