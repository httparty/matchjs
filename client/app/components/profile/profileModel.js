angular.module('app.profile')
.factory('Profile', ['$http', function($http) {

  var getCurrentUser = function(userDataObj) {
    return $http({
      method: 'GET',
      url: '/api/users/userProfile/' + userDataObj.username
    }).then(function(responseObj){
      return responseObj;
    });
  };

  // var getCurrentUserSkills = function(userDataObj) {
  //   return $http({
  //     method: 'GET',
  //     url: '/api/users/profileSkills/' + userDataObj.username
  //   }).then(function(responseObj) {
  //     return responseObj
  //   });
  // };

  // var updateProfileSkills = function(userDataObj) {
  //   return $http({
  //     method: 'POST',
  //     url: '/api/users/profileSkills',
  //     data: userDataObj
  //   }).then(function(responseObj){
  //     return responseObj;
  //   });
  // };

  var updateProfileBasics = function(userDataObj) {
    return $http({
      method: 'POST',
      url: '/api/users/profileBasics',
      data: userDataObj
    }).then(function(responseObj){
      return responseObj;
    });
  };

  return {
    getCurrentUser : getCurrentUser,
    // updateProfileSkills : updateProfileSkills,
    updateProfileBasics : updateProfileBasics
    // getCurrentUserSkills : getCurrentUserSkills
  };

}]); 