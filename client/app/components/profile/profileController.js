angular.module('app.profile', [])
	.controller('ProfileController', ['$scope', '$window', '$state', 'Profile', 'AuthService', function ($scope, $window, $state, Profile, AuthService) {
		$scope.data = {};
		$scope.data.toLearn = {};
		$scope.data.toTeach = {};
		// $scope.data.profilePhoto
		// $scope.data.name = $scope.user.displayName;
		// $scope.data.location = 'San Francisco';
		// $scope.data.github = 'url.com';

		// $scope.data.username = $window.localStorage.username;

		$scope.data.update = {}; //this is to pass new data into the form fields

		$scope.user = angular.fromJson(AuthService.getCurrentUser());

		// console.log("HERE IS USER", $scope.user);

		$scope.saveEditButton = {};
		$scope.saveEditButton.skills = {};
		$scope.saveEditButton.skills.buttonText = 'Edit';
		$scope.saveEditButton.basics = {};
		$scope.saveEditButton.basics.buttonText = 'Edit';

		$scope.updateProfileBasics = function() {
			var userDataObj = $scope.data.update; 
			console.log("here is userDataObj", userDataObj);
			Profile.updateProfileBasics(userDataObj) //update DB
				.then(function(response) {
					console.log("here is the server response", response);
					for(var key in userDataObj) { //update DOM 
						if(userDataObj[key]) {
							$scope.user[key] = userDataObj[key];
						}
					}
				})
		};

		//called from within toggleEditShow when save button is clicked 
		$scope.updateProfileSkills = function() {
			console.log('hello inside update skills!');
			var userDataObj = {};
			userDataObj.username = $scope.data.username;
			userDataObj.toLearn = [];
				for(var toLearnKey in $scope.data.toLearn) {
					userDataObj.toLearn.push(toLearnKey);
				}
			userDataObj.toTeach = [];
				for(var toTeachKey in $scope.data.toTeach) {
					userDataObj.toTeach.push(toTeachKey);
				}
			Profile.updateProfileSkills(userDataObj);
		};


		//called when BASICS edit/show button is clicked
		$scope.toggleEditShowBasics = function() {
			console.log('inside toggle edit show basics fn');
			if($scope.saveEditButton.basics.buttonText === 'Edit') {
				$scope.saveEditButton.basics.buttonText = 'Save';
			} else {
				$scope.saveEditButton.basics.buttonText='Edit';
				$scope.updateProfileBasics(); //call to fn 
			}
		};

		//called when SKILLS edit/show button is clicked
		$scope.toggleEditShowSkills = function() {
			if($scope.saveEditButton.skills.buttonText === 'Edit') {
				$scope.saveEditButton.skills.buttonText = 'Save';
			} else {
				$scope.saveEditButton.skills.buttonText='Edit';
				$scope.updateProfileSkills(); //call to fn that saves the skills 
			} 
		};

		//called on the initialization of the page
		$scope.getCurrentUserProfile = function() {
			console.log('hello inside get currentUserProfile');
			//var userDataObj = {};
			//userDataObj.username = $window.localStorage.getItem('username');
			Profile.getCurrentUser();//<--pass in userDataObj here
			//toggle true skills to true
		};

  }]);