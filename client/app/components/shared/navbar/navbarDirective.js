;(function() {
  'use strict';

  angular.module('app.navbar')
    .directive('navDir', function(){
      return {
        templateUrl: 'app/components/shared/navbar/navbar.html'
      };
    });

})();