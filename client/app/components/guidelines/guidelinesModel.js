;(function() {
  'use strict';

  angular.module('app.guidelines')
    .factory('Guidelines', ['$http', function($http){

      var guidelines = {};

      guidelines.displayGuidelines = function() {

        return $http({
          method: 'GET',
          url: '/api/auth/guidelines'
        }).then(function(responseObj){
          return responseObj;
        });
      };

      return guidelines;
    }]);
  
})();