// server.js
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Import Sequelize instance so we can sync the database.
const sequelize = require('./config/database');

// Ensure models are imported so that they register with Sequelize.
require('./models/User');
require('./models/Topic');
require('./models/Vote');

// Passport configuration
require('./passport-config')(passport);

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware for static files and parsing form data
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

// Express session middleware
app.use(session({
  secret: 'yourSecretKeyHere',
  resave: false,
  saveUninitialized: false,
}));

// Initialize Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Register routes for home, authentication, voter and admin functionalities
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/voter', require('./routes/voter'));
app.use('/admin', require('./routes/admin'));

const PORT = process.env.PORT || 3000;

// Sync models and then start the server.
sequelize.sync({ alter: true })
  .then(() => {
    console.log("Database synced.");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error("Error syncing database:", err);
  });