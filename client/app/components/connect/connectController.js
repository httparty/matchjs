angular.module('app.connect',[])
.controller('connectController', function($scope,connectModel) {
	$scope.getAllUsers = function() {
		var getUsers = connectModel.getAllUsers();
		// console.log('HERE I AM: ',connectModel.getAllUsers());
		// connectModel.getAllUsers();
		// getUsers.value.data
		console.log('HERE I AM: ',getUsers);
	};
});