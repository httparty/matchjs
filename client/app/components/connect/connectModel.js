;(function() {
  'use strict';

  angular.module('app.connect')
  .factory('connectModel',function($http){
    var model = {};

    model.getAllUsersRec = function(username) {
      return $http({
        method: 'GET',
        url: '/api/users/getAllUsersRec/' + username
      });
    };

    model.getAllUsers = function() {
      return $http({
        method: 'GET',
        url: '/api/users/getAllUsers'
      });
    };

    model.getThisUserProfile = function(username) {
      return $http({
        method: 'GET',
        url: '/userProfile/' + username
      }).then(function(response) {
        return response;
      });
    };

    model.searchUsers = function(params) {
      var locations = [];
      var skills = [];
      var names = [];

      _.each(params, function(item) {
        if (item.type === 'location') {
          locations.push(item.text);
        }
        if (item.type === 'skill') {
          skills.push(item.text);
        }
        if (item.type === 'name') {
          names.push(item.text);
        }
      });

      var queryObj = {locations: locations,
                      skills: skills,
                      names: names};

      return $http({
        method: 'GET',
        url: '/api/users/search',
        params: queryObj
      });
    };

    return model;
  });

})();