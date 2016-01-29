;(function() {
  'use strict';

  angular.module('app.connect',['ngTagsInput'])
  .controller('connectController', ['connectModel', 'AuthService', '$state', '$scope', function(connectModel, AuthService, $state, $scope) {

    var vm = this;

    vm.users = '';
    vm.pages = [1, 2, 3, 4, 5];
    var username = angular.fromJson(AuthService.getCurrentUser()).username;

    vm.getAllUsersRec = function() {
      connectModel.getAllUsersRec(username).then(function(r) {
        vm.users = r.data;
      });
    };

    vm.getAllUsers = function() {
      connectModel.getAllUsers().then(function(r) {
        vm.users = r.data;
      });
    };

    //consider moving this to profile model 
    vm.getThisUserProfile = function(username) {
      $state.go('profile', {username: username});
    };

    /*************************************************************
    Query Builder
    **************************************************************/

    vm.tags = [];
    vm.locations = [{name: 'San Francisco'}, {name:'New York'}, {name:'Boston'}];
    vm.skills = [{name: 'Angular'}, {name: 'Express'}, {name: 'MongoDB'}, {name: 'Backbone'}];

    var containsQueryParam = function(param) {
      return _.find(vm.tags, function(tag){ return tag.text === param; });
    };

    vm.removeTag = function(tag) {
      $scope.$broadcast('query-changed');
    };

    vm.addLocation = function(location) {
      if (!containsQueryParam(location)) {
        vm.tags.push({type: 'location', text: location});
        $scope.$broadcast('query-changed');
      }
    };

    vm.addSkill = function(skill) {
      if (!containsQueryParam(skill)) {
        vm.tags.push({type: 'skill', text: skill});
        $scope.$broadcast('query-changed');
      }
    };

    var source = Rx.Observable.create(function(observer) {

        $scope.$on('query-changed', function(event, args) {
          observer.onNext();
        });
      }).flatMapLatest(function() {
          return Rx.Observable.fromPromise(connectModel.searchUsers(vm.tags));
        });

    var listener = source.subscribe(function(result) {
      vm.users = result.data;
    });

    //remove Rx listener on route change
    $scope.$on('$destroy', function() {
      listener.dispose();
    });

  }]);

})();
