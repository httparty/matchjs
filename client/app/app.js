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
  }])
  .run(['$rootScope','$state','$cookies','$window',function($rootScope, $state, $cookies, $window) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) { 

      //this value is undefined if a user has never logged in
      //it's also undefined if a user logged out
      var cookie = $cookies.get('connect.sid');
      console.log("cookie", cookie);

      if(!cookie && toState.name === "home") {
        console.log("hey I'm logged out");
        return;
      } else if (!cookie && toState.name !== "home") {
        console.log("I'm still logged out in another page");
        event.preventDefault(); 
        $state.go('home');
        return;
      } else {
        console.log("hey I'm logged in");
      }    
    })
  }]);