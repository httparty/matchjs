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

  return {
    getUserProfile : getUserProfile,
    updateProfile : updateProfile
  };

}]); 