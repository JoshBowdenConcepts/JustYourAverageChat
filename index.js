const express = require('express'),
      passport = require('passport'),
      path = require('path'),
      cookieSession = require('cookie-session'),
      mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add the config keys
const keys = require('./config/keys');

// Connect to mongoose
mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

// Set up cookies
app.use(
    cookieSession({
      maxAge: 30 * 24 * 60 * 60 * 1000,
      keys: [keys.cookieKey]
    })
);

// Set up passport
app.use(passport.initialize());
app.use(passport.session());
require('./services/passport');


// Import Routes
require('./routes/index')(app);
require('./routes/authentication')(app);

// Set up static files
app.use(express.static(path.join(__dirname, "client", "build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// Send 404 if no other route matched
app.use((req, res) => {
    res.status(404).json({
        message: 'Route Not Found'
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        message: err.message,
        error: {}
    });
});

// Set up the port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log('Express app listening on port ' + port + ''));

// Export the App
module.exports = app;