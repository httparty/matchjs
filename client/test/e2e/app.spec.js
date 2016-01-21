describe("app", function () {

  describe("index", function () {

    it("should display the correct title", function () {
      browser.get('/#');
      expect(browser.getTitle()).toBe('MatchJS');
    });


  });
});