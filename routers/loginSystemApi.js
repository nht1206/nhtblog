module.exports = function(app, passport){
    /**
     * Login
     * show the login form 
     * and process the login form
     */
    app.get('/login', function(req, res){
        res.render('login', {message: req.flash('login_msg')})
    })
    app.post('/login', passport.authenticate('login', { 
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true 
    }))
    /**
     * Signup
     * show the signup form 
     * and process the signup form
     */

    app.get('/signup', function(req, res){
        res.render('signup', {message: req.flash('signup_msg')})
    })

    app.post('/signup', passport.authenticate('signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    }))

    /**
     * show the profile
     */
    app.get('/profile', isLoggedIn, function(req, res){
        res.render('profile', {user: req.user})
    })

    /**
     * logout
     */
    app.get('/logout', function(req, res){
        req.logout()
        res.redirect('/')
    })
}
// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}