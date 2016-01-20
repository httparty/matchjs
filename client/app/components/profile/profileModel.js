angular.module('app.profileModel', [])
.factory('Profile', function($http) {
  //posts events to database
  var getCurrentUser = function(userDataObj) {
    return $http({
      method: 'POST',
      // url: '/api/profile/profile',
      data: userDataObj
    }).then(function(responseObj){
      return responseObj;
    });
  };

  return {
    getCurrentUser : getCurrentUser
  }

}); 