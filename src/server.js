const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const oath = require('path');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session')
const mySQLStore = require('express-mysql-session')
const passport = require('passport')

const {database} = require('./keys');
//Initial
const app = express();
require('./lib/passport');

//setting
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));

app.set('view engine', '.hbs');

//Middlewares
app.use(session({
    secret : 'mysessionnodemysql',
    resave : false,
    saveUninitialized : false,
    store : new mySQLStore(database)
}))
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session())

//Global variables
app.use((req, res, next) =>{    //sử dụng flash, bien browser
    app.locals.success = req.flash('success')
    app.locals.message = req.flash('message')
    app.locals.user = req.user;
    console.log('app.locals.user:' , app.locals)
    next();
})
//Routes
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/links', require('./routes/links'));

//public
app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), () => {
    console.log('Listen server port:' + app.get('port'));
})