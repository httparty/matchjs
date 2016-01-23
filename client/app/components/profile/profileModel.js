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
    updateProfileBasics : updateProfileBasics
  };

}]); 