var IndexPage = require('./pages/index.page')

describe("app", function () {

  var page = new IndexPage();

  beforeEach(function() {
    page.get();
  });

  describe("index", function () {

    it("should display the correct title", function () {
      expect(page.getTitle()).toBe('MatchJS');
    });

    it("should sign in when the log in button is clicked", function () {
      // page.clickButton();
    });

  });
});