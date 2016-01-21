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

		$scope.data.updateBasics = {}; //this is to pass new data into the form fields

		$scope.user = angular.fromJson(AuthService.getCurrentUser());
		// console.log("HERE IS USER", $scope.user);

		$scope.saveEditButton = {};
		$scope.saveEditButton.skills = {};
		$scope.saveEditButton.skills.buttonText = 'Edit';
		$scope.saveEditButton.basics = {};
		$scope.saveEditButton.basics.buttonText = 'Edit';
		$scope.saveEditButton.summary = {};
		$scope.saveEditButton.summary.buttonText = 'Edit';

		$scope.selectedStyle = {};

//-------------------BASICS----------------------------
		$scope.toggleEditShowBasics = function() {
			console.log('inside toggle edit show basics fn');
			if($scope.saveEditButton.basics.buttonText === 'Edit') {
				$scope.saveEditButton.basics.buttonText = 'Save';
				$scope.selectedStyle.basics = {'background-color' : '#FFFFCC'};
			} else {
				$scope.saveEditButton.basics.buttonText='Edit';
				$scope.selectedStyle.basics = {'background-color' : '#FFFFFF'};
				$scope.updateProfileBasics(); //call to fn 
			}
		};


//------------SHARED BY BASICS & SUMMARY---------------
		$scope.updateProfileBasics = function() {
			var userDataObj = $scope.data.updateBasics; 
			console.log('here is userDataObj', userDataObj);
			if(userDataObj) {
				Profile.updateProfileBasics(userDataObj) //update DB
					.then(function(response) {
						console.log('here is the server response to BASICS update', response);
						for(var key in userDataObj) { //update DOM 
							if(userDataObj[key]) {
								$scope.user[key] = userDataObj[key];
							}
						}
					});
			}
		};

//-------------------SKILLS----------------------------
		//called when SKILLS edit/show button is clicked
		$scope.toggleEditShowSkills = function() {
			if($scope.saveEditButton.skills.buttonText === 'Edit') {
				$scope.saveEditButton.skills.buttonText = 'Save';
				$scope.selectedStyle.skills = {'background-color' : '#FFFFCC'};
			} else {
				$scope.saveEditButton.skills.buttonText='Edit';
				$scope.selectedStyle.skills = {'background-color' : '#FFFFFF'};
				$scope.updateProfileSkills(); //call to fn that saves the skills 
			} 
		};

		//called from within toggleEditShowSkills
		$scope.updateProfileSkills = function() {
			console.log('hello inside update skills!');
			var userDataObj = {};
			userDataObj.username = $scope.user.username;
			userDataObj.toLearn = [];
				for(var toLearnKey in $scope.data.toLearn) {
					userDataObj.toLearn.push(toLearnKey);
				}
			userDataObj.toTeach = [];
				for(var toTeachKey in $scope.data.toTeach) {
					userDataObj.toTeach.push(toTeachKey);
				}
			if(userDataObj) {
				Profile.updateProfileSkills(userDataObj)
					.then(function(response) {
						console.log('here is the server response to SKILLS update', response);
						//
					});
			}
		};


//-------------------SUMMARY---------------------------
		$scope.toggleEditShowSummary = function() {
			if($scope.saveEditButton.summary.buttonText === 'Edit') {
				$scope.saveEditButton.summary.buttonText = 'Save';
				$scope.selectedStyle.summary = {'background-color' : '#FFFFCC'};
			} else {
				$scope.saveEditButton.summary.buttonText='Edit';
				$scope.selectedStyle.summary = {'background-color' : '#FFFFFF'};
				$scope.updateProfileBasics(); //call to fn that saves the skills 
			} 
		};


//---------RETRIEVE USER PROFILE DATA FROM DB------------
		//called on the initialization of the page
		$scope.getCurrentUserProfile = function() {
			console.log('hello inside get currentUserProfile');
			var userDataObj = {};
			userDataObj.username = $scope.user.username;
			// $scope.data.updateBasics.summary = "hello here is test summary";
			Profile.getCurrentUser(userDataObj)
				.then(function(response) {
					//for each toLearn skills array in response, 
						//if skill value is true
						//toggle checkbox to checked: $scope.data.toLearn[] = true;//SKILLNAME] 
					//for each toTeach skills array in response
						//if skill value is true
						//toggle checkbox to checked: $scope.data.toLearn[] = true;//SKILLNAME] 
					//if response has summary
						//$scope.data.updateBasics.summary = the summary from resp
				});
		};

  }]);