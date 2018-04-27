//app.js
var express = require('express')
var bodyParser = require('body-parser')
var passport = require('passport')
var morgan = require('morgan')
var mongoose = require('mongoose')
var flash = require('connect-flash')
var session = require('express-session')

var port = process.env.PORT || 3000
/**
 * configuration
 */
//initialize server
var app = express();

//get database config
var dbConfig = require('./config/dbConfig')
//connect mongoDB
mongoose.connect(dbConfig.url)

//set engine
app.set('view engine', 'ejs')

//setup middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'))
//require for passport

app.use(session({ secret: 'iloveyousomuchxxxx' }))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

//config passport
require('./config/passport')(passport)


//require routers
require('./routers/index')(app)
require('./routers/loginSystemApi')(app, passport)


app.listen(port, function(){
    console.log('Server listening on port: ', port)
})