angular.module('app.auth')
  .factory('AuthService', ['$cookies', function($cookies) {

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