const passport = require('passport'),
      LocalStrategy = require('passport-local').Strategy,
      User = require('../models/user'),
      GoogleStrategy = require('passport-google-oauth20').Strategy;
      keys = require('../config/keys');

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

// LOCAL SIGN UP STRATEGY
passport.use('local-signup', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true 
},
function(req, email, password, done) {

    process.nextTick(function() {

    User.findOne({ 'local.email' :  email }, function(err, user) {
        if (err)
            return done(err);

        if (user) {
            return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
        } else {

            var newUser            = new User();

            // set the user's local credentials
            newUser.local.email    = email;
            newUser.local.password = newUser.generateHash(password);
            newUser.username       = req.body.username;

            // save the user
            newUser.save(function(err) {
                if (err)
                    throw err;
                return done(null, newUser);
            });
        }
    });    
    });
}));

// LOCAL LOG IN STRATEGY
passport.use('local-login', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true 
},
function(req, email, password, done) {
    User.findOne({ 'local.email' :  email }, function(err, user) {
        if (err)
            return done(err);

        if (!user)
            return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

        if (!user.validPassword(password))
            return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); 

        // all is well, return successful user
        return done(null, user);
    });
}));

// GOOGLE PASSPORT STRATEGY
passport.use('google',
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
      },
      async (accessToken, refreshToken, profile, done) => {

        const existingUser = await User.findOne({ 'google.id': profile.id })
        .catch(function (error) {
            console.log(error);
        });

        if (existingUser) {
          return done(null, existingUser);
        }

        const user = await new User({
            'google.id': profile.id,
          name: profile.name.givenName + " " + profile.name.familyName
        }).save();

        done(null, user);

      }
    )
);