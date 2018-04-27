//load strategy
var localStrategy = require('passport-local').Strategy

//load user

var User = require('../app/models/user')

module.exports = function(passport) {
    /**
     * used to serialize the user for the session
     */
    passport.serializeUser(function(user, done){
        done(null, user.id)
    })
    /**
     * used to deserialize the user
     */
    passport.deserializeUser(function(id, done){
        User.findById(id, function(err, user){
            done(err, user)
        })
    })
    //process login form
    passport.use('login', new localStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, function(req, username, password, done) {
        User.findOne({ 'local.username' : username}, function(err, user) {
            if (err) {
                return done(err)
            }
            if (!user) {
                return done(null, false, req.flash('login_msg', 'Username incorrect.'))
            }
            if (!user.validPassword(password)){
                return done(null, false, req.flash('login_msg', 'Password incorrect.'))
            }
            return done(null, user)
        })
    }))
    //process signup form
    passport.use('signup', new localStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, function(req, username, password, done) {
        process.nextTick(function(){
            User.findOne({ 'local.username': username }, function(err, user) {
                if (err) {
                    return done(err)
                }
                if (user) {
                    return done(null, false, req.flash('signup_msg', 'Username is already exists.'))
                } else {
                    var newUser = new User();
                    newUser.local.username = username
                    newUser.local.password = newUser.generateHash(password)
                    newUser.save(function(err){
                        if (err) {
                            throw err
                        }
                        console.log(newUser)
                        return done(null, newUser)
                    })
                }
            })
        })
    }))
}
    