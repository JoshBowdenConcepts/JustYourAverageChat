const passport = require('passport/lib');
const User = require('../models/user');

module.exports = function(app){

    // Start The oAuth Process
    app.get(
        '/auth/google',
        passport.authenticate('google', {
        scope: ['profile', 'email']
        })
    );

    app.get('/auth/google/callback', passport.authenticate('google', {
        failureRedirect: '/'
    }), (req, res) => {
        res.redirect('/');
    });

    app.post('/api/signup', passport.authenticate('local-signup'), (req, res) => {
        res.send(req.user);
    });

    app.post('/api/login', passport.authenticate('local-login'), (req, res) => {
        res.send(req.user);
    });

    // Profile
    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });

    app.get('/api/logout', function(req, res){
        req.logout();
        res.redirect('/');
    });

}