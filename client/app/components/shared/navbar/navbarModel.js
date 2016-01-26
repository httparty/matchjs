;(function() {
  'use strict';

  angular.module('app.navbar', [])
    .factory('NavModel', ['$http', function ($http) {
      var vm = this;

//DRY refactor needed: this function is copied over from connectModel
      vm.getThisUserProfile = function(username) {
        return $http({
        method: 'GET',
          url: '/userProfile/' + username
        }).then(function(response) {
          return response;
        });
      };

    }]);
})();