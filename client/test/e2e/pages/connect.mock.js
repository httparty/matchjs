'use strict';

function ConnectPage() {

  this.get = function() {
    browser.get("/#/connect");
  }

}

module.exports = ConnectPage;