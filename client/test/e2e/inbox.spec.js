'use strict';

var InboxPage = require('./pages/inbox.mock');

describe("app", function () {

  var page = new InboxPage();

  beforeEach(function() {
    page.get();
  });

  describe("inbox page", function () {

    it("test", function () {
      // page.clickButton();
    });

  });
});