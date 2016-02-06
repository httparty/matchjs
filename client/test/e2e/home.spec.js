var HomePage = require('./pages/home.mock');

describe("app", function () {

  var page = new HomePage();

  beforeEach(function() {
    page.get();
  });

  describe("home page", function () {

    it("should display the correct title", function () {
      expect(page.getTitle()).toBe('MatchJS');
    });

    it("should sign in when the log in button is clicked", function () {
      // page.clickButton();
    });

  });
});