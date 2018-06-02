let isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()){
        return next()
    }
    req.flash('errorsMsg', 'You are not logged in.')
    res.redirect('/login')
}
let isAdmin = (req, res, next) => {
    const user = req.session.user
    if (user) {
        if (user.username == 'nht1206') {
            return next()
        }
    }
    res.status(404).send('Not found.')
}
module.exports = {
    isLoggedIn: isLoggedIn,
    isAdmin: isAdmin
}