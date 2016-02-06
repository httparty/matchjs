describe('Controller: ConnectController', function() {

  var $httpBackend;
  var $scope;
  var AuthService;
  var $rootScope;
  var connectModel;
  var $state;
  var $cookies;

  beforeEach(module('app'));
  beforeEach(module('mock.auth-service')); 
  beforeEach(inject(function ($injector, _MockAuthService_) {

    $rootScope = $injector.get('$rootScope');
    $scope = $rootScope.$new();
    $httpBackend = $injector.get('$httpBackend');
    $controller = $injector.get('$controller');
    AuthService = _MockAuthService_;
    connectModel = $injector.get('connectModel')
    $state = $injector.get('$state');

    spyOn($rootScope, '$broadcast');
    
    ConnectController = $controller('connectController', {
      $scope: $scope,
      AuthService: AuthService,
      connectModel: connectModel,
      $state: $state
    });

  }));

  describe('Controller Variables', function () {

    it('it should contain a users property', function() {
      expect(ConnectController.users).toBeDefined();
      expect(angular.isString(ConnectController.users)).toBe(true);
    });

    it('it should contain an allCities object', function() {
      expect(ConnectController.allCities).toBeDefined();
      expect(angular.isObject(ConnectController.allCities)).toBe(true);
    });

    it('it should contain an allNames object', function() {
      expect(ConnectController.allNames).toBeDefined();
      expect(angular.isObject(ConnectController.allNames)).toBe(true);
    });

    it('it should contain a locations array', function() {
      expect(ConnectController.locations).toBeDefined();
      expect(angular.isArray(ConnectController.locations)).toBe(true);
    });

    it('it should contain a names array', function() {
      expect(ConnectController.names).toBeDefined();
      expect(angular.isArray(ConnectController.names)).toBe(true);
    });

    it('it should contain a skills array', function() {
      expect(ConnectController.skills).toBeDefined();
      expect(angular.isArray(ConnectController.skills)).toBe(true);
    });

    it('it should contain a tags array', function() {
      expect(ConnectController.tags).toBeDefined();
      expect(angular.isArray(ConnectController.tags)).toBe(true);
    });
  });

  describe('Controller Functions', function () {

    it('Should contain a getAllUsersRec property, which is a function', function () {
      expect(ConnectController.getAllUsersRec).toBeDefined();
      expect(angular.isFunction(ConnectController.getAllUsersRec)).toBe(true);
    });

    it('Should contain a getAllUsers property, which is a function', function () {
      expect(ConnectController.getAllUsers).toBeDefined();
      expect(angular.isFunction(ConnectController.getAllUsers)).toBe(true);
    });

    it('Should contain a getThisUserProfile property, which is a function', function () {
      expect(ConnectController.getThisUserProfile).toBeDefined();
      expect(angular.isFunction(ConnectController.getThisUserProfile)).toBe(true);
    });

    it('Should contain a removeTag property, which is a function', function () {
      expect(ConnectController.removeTag).toBeDefined();
      expect(angular.isFunction(ConnectController.removeTag)).toBe(true);
    });

    it('Should contain a addLocation property, which is a function', function () {
      expect(ConnectController.addLocation).toBeDefined();
      expect(angular.isFunction(ConnectController.addLocation)).toBe(true);
    });

    it('Should contain a addSkill property, which is a function', function () {
      expect(ConnectController.addSkill).toBeDefined();
      expect(angular.isFunction(ConnectController.addSkill)).toBe(true);
    });

    it('Should contain a addSkill property, which is a function', function () {
      expect(ConnectController.addName).toBeDefined();
      expect(angular.isFunction(ConnectController.addName)).toBe(true);
    });
  });

  describe('Search Query Broadcasts Events', function () {

    it("Adding a location broadcasts a query change", function() {
        ConnectController.addLocation("New York");
        expect($rootScope.$broadcast).toHaveBeenCalledWith('query-changed');
    });

    it("Adding a skill broadcasts a query change", function() {
        ConnectController.addSkill("AngularJS");
        expect($rootScope.$broadcast).toHaveBeenCalledWith('query-changed');
    });

    it("Adding a name broadcasts query change", function() {
        ConnectController.addName("Vivario");
        expect($rootScope.$broadcast).toHaveBeenCalledWith('query-changed');
    });
  });

  describe('Adding locations to search query', function () {

    it("Adding a new location adds a query param to tags array", function() {
      expect(ConnectController.tags.length).toBe(0);
      ConnectController.addLocation("San Francisco");
      expect(ConnectController.tags.length).toBe(1);
    });

    it("Selecting the same location twice does not add it more than once to tags array", function() {
      expect(ConnectController.tags.length).toBe(0);
      ConnectController.addLocation("San Francisco");
      expect(ConnectController.tags.length).toBe(1);
      ConnectController.addLocation("San Francisco");
      expect(ConnectController.tags.length).toBe(1);
    });
  });

  describe('Adding skills to search query', function () {

    it("Adding a new skills adds a query param to tags array", function() {
      expect(ConnectController.tags.length).toBe(0);
      ConnectController.addSkill("AngularJS");
      expect(ConnectController.tags.length).toBe(1);
    });

    it("Selecting the same skill twice does not add it more than once to tags array", function() {
      expect(ConnectController.tags.length).toBe(0);
      ConnectController.addSkill("AngularJS");
      expect(ConnectController.tags.length).toBe(1);
      ConnectController.addSkill("AngularJS");
      expect(ConnectController.tags.length).toBe(1);
    });
  });

  describe('Adding names to search query', function () {

    it("Adding a new names adds a query param to tags array", function() {
      expect(ConnectController.tags.length).toBe(0);
      ConnectController.addName("Vivario");
      expect(ConnectController.tags.length).toBe(1);
    });

    it("Selecting the same name twice does not add it more than once to tags array", function() {
      expect(ConnectController.tags.length).toBe(0);
      ConnectController.addName("Vivario");
      expect(ConnectController.tags.length).toBe(1);
      ConnectController.addName("Vivario");
      expect(ConnectController.tags.length).toBe(1);
    });
  });
});