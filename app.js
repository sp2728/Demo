var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var User = require('./models').User;

//Initialize Sequilize
var sequelize = require('./connection');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.use(session({
  name: 'session_id',
  secret: '12345',
  resave: false,
  saveUninitialized: false,
}));

app.use((req, res, next) => {
  if (req.cookies.session_id && !req.session.user) {
    res.clearCookie('session_id');
  }
  next();
});

User.findOne({ where: { email: 'sai@gmail.com' } }).then((user) => {
  if (user) {
    console.log('Super admin already existed');
  }
  else {
    let user = User.create({ firstName: 'Sai Kiran', lastName: 'Pocham', email: 'sai@gmail.com', password: 'password', status: 'Active', role: 'Super-Admin' });

    user.then((result) => {
      if (result) {
        console.log('Super admin user created');
      }
      else {
        console.log('Error in creating super admin');
      }
    })
      .catch((err) => {
        console.log(err);
      })
  }


})
app.use('/', indexRouter);
app.use('/', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
