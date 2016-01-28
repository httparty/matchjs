;(function() {
  'use strict';

  angular.module('app.connect',['ngTagsInput'])
  .controller('connectController', ['connectModel', 'AuthService', '$state', '$scope', function(connectModel, AuthService, $state, $scope) {

    var vm = this;
    vm.users = '';
    vm.pages = [1, 2, 3, 4, 5];
    var current_user = angular.fromJson(AuthService.getCurrentUser());
    var username = current_user.username;

    //RECOMMENDED USERS
    vm.getAllUsersRec = function() {
      connectModel.getAllUsersRec(username).then(function(r) {
        vm.users = r.data;
      });
    };

    //consider moving this to profile model 
    vm.getThisUserProfile = function(username) {
      $state.go('profile', {username: username});
    };

    vm.getAllUsers = function() {
      connectModel.getAllUsers().then(function(r) {
        vm.searchResults = r.data;
      });
    };

    //BROWSING USERS
    vm.searchResults = '';
    vm.entities = [];
    vm.filters = {};

    /*************************************************************
    Without RxJS
    
    The following code is used to implement a search of users by location.

    - It depends on a promise-based (.then()) implementation.
    - The problem with a promise-based implemenation is that you can't control
    the time a promise takes to resolve.
    - What you'll find is that the UI won't display the latest query result;
    it will display the one that takes the longest to resolve first.
    - This is a known side effect of promises.

    function searchEntities(type){
      console.log('type', type);
      connectModel.getUsersByLocation(type).then(function(result) {
        vm.entities = result.data;
      });
    }

    $scope.$watch(function(){ 
      return vm.filters.entityType;
    }, function(newVal){
      if (newVal) {
        searchEntities(newVal);
      }
    });
    **************************************************************/

    /*************************************************************
    With RxJS/Observables

    - RxJS resolves our problem stated above
    - You no longer have to depend on how long it takes to resolve 
    promises.

    **************************************************************/

      var source = Rx.Observable.create(function(observer) {
        $scope.$watch(function(){ 
          return vm.filters.entityType;
        }, function(newVal){
            observer.onNext(newVal);
        })
      }).flatMapLatest(function(type) {
          return Rx.Observable.fromPromise(connectModel.getUsersByLocation(type));
        });

      var listener = source.subscribe(function(result) {
        console.log("go here");
        vm.entities = result.data;
      });

      //remove Rx listener on route change
      $scope.$on('$destroy', function() {
        listener.dispose();
      });

      //TAGS

      vm.tags = [
            // { text: 'recommended' }
          ];
      
  }]);

})();
