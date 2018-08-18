// load environment variables
require('dotenv').config();

// grab our dependencies
const express    = require('express'),
  app            = express(),
  expressLayouts = require('express-ejs-layouts'),
  mongoose       = require('mongoose'),
  bodyParser     = require('body-parser'),
  session        = require('express-session'),
  cookieParser   = require('cookie-parser'),
  flash          = require('connect-flash'), //error UI
  argv           = require('minimist')(process.argv.slice(2)),
  expressValidator = require('express-validator');

// set session
app.use(session({
  secret: process.env.SECRET,
  cookie: { maxAge: 60000 },
  resave: false,    // forces the session to be saved back to the store
  saveUninitialized: false  // dont save unmodified
}));
app.use(flash());

// tell express where to look for static assets
app.use(express.static(__dirname + '/public'));

// set ejs as our templating engine
app.set('view engine', 'ejs');
app.use(expressLayouts);

// connect to database
mongoose.connect(process.env.DB_URI);

// use body parser to grab info from a form
app.use(bodyParser.urlencoded({ extended: true })); //true changed to false for validation test
app.use(bodyParser.json());

//Validation
app.use(expressValidator());

// set the routes =============================
app.use(require('./app/routes'));

// start our engines ===========================
app.listen(8080, function() {
  console.log(`App listening on 8080`);
});
