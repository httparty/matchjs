describe('Controller: ConnectController', function() {

  var $httpBackend;
  var $scope;
  var AuthService;
  var $rootScope;
  var connectModel;
  var $state;

  beforeEach(module('app'));
  beforeEach(inject(function ($injector) {

    $rootScope = $injector.get('$rootScope');
    $scope = $rootScope.$new();
    $httpBackend = $injector.get('$httpBackend');
    $controller = $injector.get('$controller');
    AuthService = $injector.get('AuthService');
    connectModel = $injector.get('connectModel')
    $state = $injector.get('$state');
    
    //inject a mock cookie somewhere

    //this is currently not working
    //because it can't get info from a cookie

    // ConnectController = $controller('connectController', {
    //   $scope: $scope,
    //   AuthService: AuthService,
    //   connectModel: connectModel,
    //   $state: $state
    // });

  }));

  afterEach(function () {
    //any after each goes here

  });

  describe('vm', function () {

    it('test', function() {
      // expect(AuthController.email).toBeDefined();
      // expect(AuthController.action).toBeDefined();
    });

    it('should equal 4', function() {
      expect("4").toBe("4");
    });
  });
});