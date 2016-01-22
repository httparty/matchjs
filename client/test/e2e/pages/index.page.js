'use strict';

function IndexPage() {
  this.button = element(by.id('button-login'));

  this.get = function() {
    browser.get("/#");
  }

  this.getTitle = function() {
    return browser.getTitle();
  }
}

module.exports = IndexPage;