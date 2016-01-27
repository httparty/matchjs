;(function(){
  'use strict';
  angular.module('app.invitations', [])
  .controller('invitationsController', ['invitationsModel', 'AuthService', '$state', 'Profile', '$scope',function(invitationsModel, AuthService, $state, Profile, $scope){

    var vm = this;

    var current_user = angular.fromJson(AuthService.getCurrentUser());

    vm.username = current_user.username;

    vm.recipient = $state.params.username;

    Profile.getUserProfile($state.params).then(function(response){

      vm.recipientProfile = response.data;
    });

    vm.formData = {};

    vm.createInvitation = function() {
      console.log('Invitation Submitted!');
      vm.formData.mentor = vm.username;
      vm.formData.mentee = vm.recipient;
      vm.formData.sessionInfo.when = new Date();
      console.dir(vm.formData);
      invitationsModel.createInvitation(vm.formData)
        .then(function(r){
          console.dir(r.data);
          vm.formData = {};
        });

      // .then(function(r){
      //   console.dir(r.data);
      //   vm.user = r.data;
      // });
    };

    vm.myTime = new Date();
    vm.hstep = 1;
    vm.mstep = 5;

    vm.options = {
      hstep: [1, 2, 3],
      mstep: [1, 5, 10, 15, 25, 30]
    };

    vm.ismeridian = true;

    vm.toggleMode = function() {
      vm.ismeridian = ! vm.ismeridian;
    };

    vm.clear = function() {
      vm.mytime = null;
    };

    vm.update = function() {
      var d = new Date();
      d.setHours( 12 );
      d.setMinutes( 0 );
      vm.mytime = d;
    };

//Date picker code

$scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function() {
    $scope.dt = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };

  $scope.toggleMin();
  $scope.maxDate = new Date(2020, 5, 22);

  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };

  $scope.open2 = function() {
    $scope.popup2.opened = true;
  };

  $scope.setDate = function(year, month, day) {
    $scope.dt = new Date(year, month, day);
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
  $scope.altInputFormats = ['M!/d!/yyyy'];

  $scope.popup1 = {
    opened: false
  };

  $scope.popup2 = {
    opened: false
  };

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date();
  afterTomorrow.setDate(tomorrow.getDate() + 1);
  $scope.events =
    [
      {
        date: tomorrow,
        status: 'full'
      },
      {
        date: afterTomorrow,
        status: 'partially'
      }
    ];

  $scope.getDayClass = function(date, mode) {
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  };



  }]);
})();
