var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
//var about = require('./routes/about');
//var login = require('./routes/login');
var aboutRouter = require('./routes/about');
var loginRouter = require('./routes/login');
var signupRouter = require('./routes/signup');
var maingameRouter = require('./routes/maingame')

var app = express();
var server = require('http').Server(app);
const io = require('socket.io')(server);
var connect = require('./models/cm')(io);

// view engine setup
//app.engine('html', cons.swig)
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
//var engine = require('consolidate');
//app.set('view engine', 'html');
//app.engine('html', engines.mustache);

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/about',aboutRouter);
app.use('/login',loginRouter);
app.use('/signup', signupRouter);
app.use('/maingame', maingameRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = { app, server, io };
