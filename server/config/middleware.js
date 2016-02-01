var bodyParser = require('body-parser');
var morgan = require('morgan');
var cors = require('cors');
var githubSessions = require('./githubSessions.js');

module.exports = function(app, express) {

  app.use(bodyParser.urlencoded({
  extended: true
  }));
  app.use(bodyParser.json());
  app.use(cors());
  app.use(morgan('combined'));
  app.use(express.static(__dirname +  '/../../client'));

  // initializes client sessions and Github login
  githubSessions.initialize(app);

  var authRouter = express.Router();
  var usersRouter = express.Router();
  var messageRouter = express.Router();
  var emailRouter = express.Router();
  var invitationsRouter = express.Router();
  var calendarRouter = express.Router();

  app.use('/auth', authRouter);
  app.use('/api/users', usersRouter);
  app.use('/api/inbox', messageRouter);
  app.use('/api/email', emailRouter);
  app.use('/api/invitations', invitationsRouter);
  app.use('/api/calendar', calendarRouter);

  app.get('/failure', function(req, res) {
    res.status('404');
    res.send('you don\'t have access to that resource. redirecting to sign in.');
  });

  app.get('/resource', githubSessions.restrict, function(req, res) {
    res.status('200');
    res.send('you have access to this resource');
  });

  app.get('/logout', function(req, res) {
    req.session.destroy(function() {
      res.clearCookie('connect.sid', { path: '/' });
      res.clearCookie('user-profile');
      res.redirect('/');
    });
  });

  require(__dirname + './../auth/authRoutes.js')(authRouter);
  require(__dirname + './../users/usersRoutes.js')(usersRouter);
  require(__dirname + './../email/emailRoutes.js')(emailRouter);
  require(__dirname + './../invitations/invitationsRoutes.js')(invitationsRouter);
  require(__dirname + './../calendar/calendarRoutes.js')(calendarRouter);
};

