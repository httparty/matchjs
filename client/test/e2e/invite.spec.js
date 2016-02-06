var InvitePage = require('./pages/invite.mock');

describe("app", function () {

  var page = new InvitePage();

  beforeEach(function() {
    page.get();
  });

  describe("invite page", function () {

    it("test", function () {
      // page.clickButton();
    });

  });
});