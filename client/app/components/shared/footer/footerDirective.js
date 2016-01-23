;(function() {
  'use strict';

  angular.module('app.footer')
    .directive('footerDir', function(){
      return {
        templateUrl: 'app/components/shared/footer/footer.html'
      };
    });
})();
