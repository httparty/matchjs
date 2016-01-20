angular.module('app.profile')
.factory('Profile', ['$http', function($http) {

  var getCurrentUser = function(userDataObj) {
    return $http({
      method: 'POST',
      url: '/api/users/user',
      data: userDataObj
    }).then(function(responseObj){
      return responseObj;
    });
  };

  var updateProfileSkills = function(userDataObj) {
    return $http({
      method: 'POST',
      url: '/api/users/skills',
      data: userDataObj
    }).then(function(responseObj){
      return responseObj;
    });
  };

  var updateProfileBasics = function(userDataObj) {
    return $http({
      method: 'POST',
      url: '/api/users/basics',
      data: userDataObj
    }).then(function(responseObj){
      return responseObj;
    });
  };

  return {
    getCurrentUser : getCurrentUser,
    updateProfileSkills : updateProfileSkills,
    updateProfileBasics : updateProfileBasics
  };

}]); 