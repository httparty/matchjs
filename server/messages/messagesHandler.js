var helpers = require('../db/helpers.js');
var db = require('../db/config.js');

module.exports = {
  sendMessage: function(req, res) {
    return helpers.addMessage(req) //some function here
    .then(function(){
      console.log('Message sent successfully!!!');
      res.send();
    });
  }
};
