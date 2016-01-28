;(function(){
  'use strict';
  angular.module('app.invitations', [])
  .controller('invitationsController', ['invitationsModel', 'AuthService', '$state', 'Profile',function(invitationsModel, AuthService, $state, Profile){

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

    //Set meeting time
    vm.myTime = new Date();

    vm.hstep = 1;
    vm.mstep = 5;

    vm.minDate = new Date();
    // vm.options = {
    //   hstep: [1, 2, 3],
    //   mstep: [1, 5, 10, 15, 25, 30]
    // };

    vm.ismeridian = true;

    vm.toggleMode = function() {
      vm.ismeridian = ! vm.ismeridian;
    };

    vm.clear = function() {
      vm.mytime = null;
      vm.dt = null
    };

    // vm.update = function() {
    //   var d = new Date();
    //   d.setHours( 12 );
    //   d.setMinutes( 0 );
    //   vm.mytime = d;
    // };

//Date picker code


  // Disable weekend selection
  vm.disabled = function(date, mode) {
    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
  };

  // vm.toggleMin = function() {
  //   vm.minDate = vm.minDate ? null : new Date();
  // };

  // vm.toggleMin();

  vm.maxDate = new Date(2020, 5, 22);

  vm.open1 = function() {
    vm.popup1.opened = true;
  };

  vm.open2 = function() {
    vm.popup2.opened = true;
  };

  vm.setDate = function(year, month, day) {
    vm.dt = new Date(year, month, day);
  };

  vm.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  vm.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  vm.format = vm.formats[0];
  vm.altInputFormats = ['M!/d!/yyyy'];

  vm.popup1 = {
    opened: false
  };

  vm.popup2 = {
    opened: false
  };

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date();
  afterTomorrow.setDate(tomorrow.getDate() + 1);
  vm.events =
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

  vm.getDayClass = function(date, mode) {
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i = 0; i < vm.events.length; i++) {
        var currentDay = new Date(vm.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return vm.events[i].status;
        }
      }
    }

    return '';
  };



  }]);
})();
