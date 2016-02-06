var ProfilePage = require('./pages/profile.mock');

describe("app", function () {

  var page = new ProfilePage();

  beforeEach(function() {
    page.get();
  });

  describe("profile page", function () {

    it("test", function () {
      // page.clickButton();
    });

  });
});