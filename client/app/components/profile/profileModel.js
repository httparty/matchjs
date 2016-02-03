angular.module('app.profile')
.factory('Profile', ['$http', function($http) {

  var getUserProfile = function(userDataObj) {
    return $http({
      method: 'GET',
      url: '/api/users/userProfile/' + userDataObj.username
    }).then(function(responseObj){
      return responseObj;
    });
  };

  var updateProfile = function(userDataObj) {
    return $http({
      method: 'POST',
      url: '/api/users/profile',
      data: userDataObj
    }).then(function(responseObj){
      return responseObj;
    });
  };

  var addPadawan = function(mentor, padawan) {
    return $http({
      method: 'POST',
      url: '/api/users/addPadawan/' + mentor.username,
      data: padawan
    });
  };

  var deletePadawan = function(mentor, padawan) {
    return $http({
      method: 'DELETE',
      url: '/api/users/padawan/' + mentor.username + '/' + padawan.username
    });
  };

  var getPadawans = function(mentor) {
    return $http({
      method: 'GET',
      url: '/api/users/getPadawans/' + mentor.username
    }).then(function(responseObj){
      return responseObj;
    });
  };

  var getMentors = function(mentee) {
    return $http({
      method: 'GET',
      url: '/api/users/getMentors/' + mentee.username
    }).then(function(responseObj) {
      return responseObj;
    });
  };

  return {
    getUserProfile : getUserProfile,
    updateProfile : updateProfile,
    addPadawan : addPadawan,
    deletePadawan : deletePadawan,
    getPadawans : getPadawans,
    getMentors : getMentors
  };

}]); 