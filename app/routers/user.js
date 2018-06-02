//app/routers/user.js
module.exports = (app, passport) => {
    app.use((req, res, next) => {
        res.locals.successMsg = req.flash('successMsg')[0]
        res.locals.errorsMsg = req.flash('errorsMsg')[0]
        next()
    })
    /**
     * Login form and process
     */
    app.get('/login', (req, res) => {
        res.render('login')
    })

    app.post('/login', passport.authenticate('localLogin', {
		successRedirect : '/admin', // redirect to the secure section
		failureRedirect : '/login', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}))
    /**
     * signup form and process
     */
    app.get('/signup', (req, res) => {
        res.render('signup', {message: []})
    })

    app.post('/signup', checkBody, passport.authenticate('localSignup', {
        successRedirect: '/admin',
        failureRedirect: '/signup',
        failureFlash: true
    }))
    /**
     * logout
     */
    app.get('/logout', (req, res) => {
        req.logout()
        req.flash('successMsg', 'Logout successfully.')
        res.redirect('/login')
    })
}
let checkBody = (req, res, next) => {
    req.checkBody('username')
    .notEmpty().withMessage('Username is required')
    req.checkBody('name')
    .notEmpty().withMessage('Your name is required.')
    req.checkBody('email')
    .isEmail().withMessage('Email is not valid.')
    req.checkBody('Password')
    .isLength({ min: 5 })
    .withMessage('Password must be at least 5 chars long.')
    .matches(/\d/)
    .withMessage('Password must be contain one number.')
    .notEmpty()
    .withMessage('Password is required.')
    //validate 
    let errors = req.validationErrors()
    if (errors) {
        res.render('signup', { message: errors })
    } else {
      next()
    }
}
