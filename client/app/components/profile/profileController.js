angular.module('app.profile', [])
	.controller('ProfileController', ['$scope', '$window', '$state', 'Profile', function ($scope, $window, $state, Profile) {
		$scope.data = {};
		$scope.data.toLearn = [];
		$scope.data.toTeach = [];

		$scope.saveEditButton = {};
		$scope.saveEditButton.buttonText = 'Edit';

		$scope.updateSkills = function() {
			console.log('hello inside update skills!');
		};

		$scope.saveSkills = function() {
			console.log("inside saveskills function")
		};

		$scope.editSkills = function() {
			console.log("inside editskills fn");
			$scope.showEdit = false;
		};

		$scope.toggleEditShow = function() {
			if($scope.saveEditButton.buttonText === 'Edit') {
				$scope.saveEditButton.buttonText = 'Save'
			} else {
				$scope.saveEditButton.buttonText='Edit';
				//call to fn that saves the skills
			} 
		};

		$scope.getCurrentUserProfile = function() {
			console.log('hello inside get currentUserProfile');
			Profile.getCurrentUser()//<--data obj goes here;
		};

  }]);










		// $scope.editShow = true;
		// $scope.skillsEdit = true;
		// if ($scope.editShow === true) {
		// 	$scope.skillsButton.editOrSaveText = 'Edit';
		// }
   // class = "skillsButton" 

			// $scope.editSkills ==== false ? true: false;
			// if($scope.editShow === false) {
			// 	$scope.skillsButton.editOrSaveText = 'Save';
			// }
			// class="skillsEditButton" ng-show="skillsEdit" ng-model="" 
		// 			<button ng-show="!skillsEdit" ng-click="saveSkills()">
		// 	Save
		// </button>