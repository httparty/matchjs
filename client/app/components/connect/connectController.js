;(function() {
  'use strict';

  angular.module('app.connect',['ngTagsInput'])
  .controller('connectController', ['connectModel', 'AuthService', '$state', '$scope', function(connectModel, AuthService, $state, $scope) {

    var vm = this;

    vm.users = '';
    vm.pages = [1, 2, 3, 4, 5];
    var username = angular.fromJson(AuthService.getCurrentUser()).username;

    vm.allCities = {};
    vm.allNames = {};
    vm.locations = [];
    vm.names = [];
    vm.skills = [{name: 'AngularJS'}, 
                 {name: 'Express'},
                 {name: 'JavaScript'},
                 {name: 'Backbone'},
                 {name: 'Node.js'},
                 {name: 'ReactJS'}];

    vm.getAllUsersRec = function() {
      connectModel.getAllUsersRec(username).then(function(r) {
        vm.users = r.data;
      });
    };

    vm.getAllUsers = function() {
      connectModel.getAllUsers().then(function(r) {
        vm.users = r.data;
        //get distinct locations
        //get distinct skills
        //get distinct names
        _.each(r.data, function(item) {

          if (item.location) {
            if (!vm.allCities[item.location]) {
              vm.allCities[item.location] = 1;
            }
          }

          if (item.name) {
            if (!vm.allNames[item.name]) {
              vm.allNames[item.name] = 1;
            }
          }
        });

          vm.locations = _.map(vm.allCities, function(item, key) {
            return {name: key};
          });

          vm.names = _.map(vm.allNames, function(item, key) {
            return {name: key};
          });
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

    vm.addName = function(name) {
      if (!containsQueryParam(name)) {
        vm.tags.push({type: 'name', text: name});
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
