//app.js
/**setup
 * get all we need
 */

let express = require('express')
let session = require('express-session')
let bodyParser = require('body-parser')
let cookie = require('cookie-parser')
let flash = require('connect-flash')
let morgan = require('morgan')
let passport = require('passport')
let expressValidator = require('express-validator')
//config port 
let port = process.env.PORT || 3000

//generate app server
let app = express()

//setup our express app

//set view engine

app.set('view engine', 'ejs')

//log every request to the console
app.use(morgan('dev'))
//read cookie 
app.use(cookie())
//
app.use(bodyParser.urlencoded({
    extended: true
}))
//
app.use(bodyParser.json())

//config passport
require('./app/config/passport')(passport)

//setup for passport

app.use(session({
    secret: 'nht1206xxxx',
    resave: true,
    saveUninitialized: false,
    cookie: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

//setup validator
app.use(expressValidator({
    "msg": "The error message",
    "param": "param.name.with.index[0]",
    "value": "param value",
    // Location of the param that generated this error.
    // It's either body, query, params, cookies or headers.
    "location": "body"
  
    // nestedErrors only exist when using the oneOf function
  }))
//set static 
app.use('/assets', express.static(__dirname + '/public'))

//require routers
require('./app/routers/home')(app)
require('./app/routers/user')(app, passport)
require('./app/routers/admin')(app)

app.listen(port, () => {
    console.log('Server listenig on port: ', port)
})





