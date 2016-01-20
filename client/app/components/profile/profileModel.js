angular.module('app.profileModel', [])
.factory('Profile', function($http) {

  var getCurrentUser = function(userDataObj) {
    return $http({
      method: 'POST',
      url: '/api/profile/user',
      data: userDataObj
    }).then(function(responseObj){
      return responseObj;
    });
  };

  var updateProfileSkills = function(userDataObj) {
    return $http({
      method: 'POST',
      url: '/api/profile/skills',
      data: userDataObj
    }).then(function(responseObj){
      return responseObj;
    });
  };

  var updateProfileBasics = function(userDataObj) {
    return $http({
      method: 'POST',
      url: '/api/profile/basics',
      data: userDataObj
    }).then(function(responseObj){
      return responseObj;
    });
  }

  return {
    getCurrentUser : getCurrentUser,
    updateProfileSkills : updateProfileSkills,
    updateProfileBasics : updateProfileBasics
  }

}); 