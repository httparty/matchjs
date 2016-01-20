// factory that calls helper func, displays all users
angular.module('app.connect',[])
.factory('connectModel',function($http){
	var model = {};

	model.getAllUers = function() {
		return $http({
			method: 'GET',
			url: '/api/users/getAllUsers'
		});
	}

	return model;
});