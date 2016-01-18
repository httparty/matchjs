var bodyParser = require('body-parser');
var morgan = require('morgan');
var cors = require('cors');

module.exports = function(app, express) {

  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(cors());
  app.use(morgan('combined'));
  app.use(express.static(__dirname +  "/../../client"));

  // app.get('/', function(req, res) {
  //   res.status('200');
  //   res.send("Hello World");
  // });
}

