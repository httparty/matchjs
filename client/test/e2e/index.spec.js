describe("app", function () {

  describe("index", function () {

    it("should display the correct title", function () {
      //currently doesn't work
      browser.get('http://localhost:5000/#/');
      expect(browser.getTitle()).toBe('MatchJS');
    });

  });
});