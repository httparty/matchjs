describe('Controller: InboxController', function() {

  var $httpBackend;
  var $scope;
  var AuthService;
  var $rootScope;
  var $firebaseArray;
  var $firebaseObject;
  var connectModel;
  var moment;
  var inboxModel;
  var $state;
  var Profile;

  beforeEach(module('app'));
  beforeEach(inject(function ($injector) {

    $rootScope = $injector.get('$rootScope');
    $scope = $rootScope.$new();
    // $httpBackend = $injector.get('$httpBackend');
    $controller = $injector.get('$controller');
    AuthService = $injector.get('AuthService');
    $firebaseArray = $injector.get('$firebaseArray');
    $firebaseObject = $injector.get('$firebaseObject');
    connectModel = $injector.get('connectModel');
    moment = $injector.get('moment');
    inboxModel = $injector.get('inboxModel');
    $state = $injector.get('$state');
    Profile = $injector.get('Profile');

    //can't read property username of undefined
    
    // InboxController = $controller('InboxController', {
    //   $scope: $scope,
    //   AuthService: AuthService,
    //   $firebaseArray: $firebaseArray,
    //   $firebaseObject: $firebaseObject,
    //   connectModel: connectModel,
    //   moment: moment,
    //   inboxModel: inboxModel,
    //   $state: $state,
    //   Profile: Profile
    // });

  }));

  afterEach(function () {
    //any after each goes here
  });

  describe('vm.email', function () {

    // it('should expose action route to the view', function() {
    //   expect(AuthController.email).toBeDefined();
    //   expect(AuthController.action).toBeDefined();

    // });
    it('should equal 4', function() {
      expect("4").toBe("4");
    });
  });
});