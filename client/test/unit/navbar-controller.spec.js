describe('Controller: NavController', function() {

  var AuthService;
  var $state;

  beforeEach(module('app'));
  beforeEach(inject(function ($injector) {

    // $rootScope = $injector.get('$rootScope');
    // $scope = $rootScope.$new();
    // $httpBackend = $injector.get('$httpBackend');
    $controller = $injector.get('$controller');
    AuthService = $injector.get('AuthService');
    $state = $injector.get('$state');

    //Need to mock a cookie
    // NavController = $controller('NavController', {
    //   $state: $state,
    //   AuthService: AuthService
    // });

  }));

  afterEach(function () {
    //any after each goes here
  });

  describe('vm.email', function () {

   it('should equal 4', function() {
      expect("4").toBe("4");
    });
  });
});