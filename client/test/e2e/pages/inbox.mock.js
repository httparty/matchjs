'use strict';

function InboxPage() {

  this.get = function() {
    browser.get("/#/inbox");
  }
}

module.exports = InboxPage;