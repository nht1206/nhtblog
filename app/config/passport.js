//config/passport.js
let LocalStrategy = require('passport-local').Strategy
let Users = require('../models/users')
let bcrypt = require('bcrypt')


module.exports = (passport) => {
    /**
     * passport setup
     */
    //used to serialize the user for session

    passport.serializeUser((user, done) => {
        console.log('[passport] serializeUser')
        done(null, user.id)
    })

    //used to deserialize the user

    passport.deserializeUser((id, done) => {
        // find by id 
        console.log('[passport] deserializeUser')
        Users.findUserById(id).then((data) => {
            done(null, data)
        }).catch((err) => {
            done(err)
        })
    })
    //Used to hash password to secure
    let hashPassword = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    //Used to encoded hash and compare
    let validPassword = (password, hash) => bcrypt.compareSync(password, hash)
    passport.use('localLogin', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, (req, username, password, done) => {
        Users.findUserByUsername(username).then((data) => {
            if (!data) {
                return done(null, false, req.flash('errorsMsg', 'Username incorrect.'))
            }
            let isValidPassword = validPassword(password, data.password)
            if (isValidPassword) {
                req.session.user = data
                return done(null, data)
            }
            done(null, false, req.flash('errorsMsg', 'Password incorrect.'))
        })
    }))

    passport.use('localSignup', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, (req, username, password, done) => {
        Users.findUserByUsername(username).then((data) => {
            if (data) {
                return done(null, false, req.flash('errorsMsg', 'Username existed.'))
            }
            var user = {
                username: username,
                password: password,
                email: req.body.email,
                name: req.body.name,
                id: '',
                date_create: new Date()
            }
            user.password = hashPassword(password)
            Users.addUser(user).then((data) => {
                user.id = data.insertId
                req.session.user = user
                done(null, user)
            })
        })
    }))
}