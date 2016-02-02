describe('Controller: InvitationsController', function() {

  var $httpBackend;
  var AuthService;
  var $rootScope;
  var invitationsModel;
  var $state;
  var Profile;

  beforeEach(module('app'));
  beforeEach(inject(function ($injector) {

    // $rootScope = $injector.get('$rootScope');
    // $scope = $rootScope.$new();
    // $httpBackend = $injector.get('$httpBackend');
    $controller = $injector.get('$controller');
    AuthService = $injector.get('AuthService');
    invitationsModel = $injector.get('invitationsModel');
    $state = $injector.get('$state');
    Profile = $injector.get('Profile');

    //need to mock a cookie
    // InvitationsController = $controller('InvitationsController', {
    //   AuthService : AuthService,
    //   invitationsModel : invitationsModel,
    //   $state : $state,
    //   Profile : Profile
    // });

  }));

  afterEach(function () {
    //any after each goes here
  });

  describe('vm.email', function () {

    it('should expose action route to the view', function() {
    
    });

    it('should equal 4', function() {
      expect("4").toBe("4");
    });

  });
});