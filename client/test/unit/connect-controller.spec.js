describe('Controller: ConnectController', function() {

  var $httpBackend;
  var $scope;
  var AuthService;
  var $rootScope;
  var connectModel;
  var $state;
  var $cookies;

  beforeEach(module('mock.auth-service')); 
  beforeEach(module('app'));
  beforeEach(inject(function ($injector, _MockAuthService_) {

    $rootScope = $injector.get('$rootScope');
    $scope = $rootScope.$new();
    $httpBackend = $injector.get('$httpBackend');
    $controller = $injector.get('$controller');
    AuthService = _MockAuthService_;

    connectModel = $injector.get('connectModel')
    $state = $injector.get('$state');
    
    ConnectController = $controller('connectController', {
      $scope: $scope,
      AuthService: AuthService,
      connectModel: connectModel,
      $state: $state
    });

  }));

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