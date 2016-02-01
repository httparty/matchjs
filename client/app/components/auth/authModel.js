;(function() {
  'use strict';

  angular.module('app.auth')
    .factory('AuthService', ['$cookies', '$http', function($cookies, $http) {

      var updateEmail = function(email) {
        
      };

      var isAuthenticated = function () {
        return !!$cookies.get('user-profile');
      };

      var getCurrentUser = function () {
        var str = $cookies.get('user-profile');
        if (str) {
          var profile = str.substring(str.indexOf('{'), str.lastIndexOf('}') + 1);
          return profile;
        }
        return undefined;
      };

      return {
        isAuthenticated : isAuthenticated,
        getCurrentUser : getCurrentUser
      };
    }]);
    
})();