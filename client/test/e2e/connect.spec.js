'use strict';

var ConnectPage = require('./pages/connect.mock');

describe("app", function () {

  var page = new ConnectPage();

  beforeEach(function() {
    page.get();
  });

  describe("connect page", function () {

    it("test", function () {
      // page.clickButton();
    });

  });
});