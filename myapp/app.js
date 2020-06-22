var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')({
  origin: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With', 'Accept'],
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  optionsSuccessStatus: 200
});

var errorMiddware = require('./middlewares/error');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var localidadesRouter = require('./routes/localidades');
var categoriaRouter = require('./routes/categoria');
var marcaRouter = require('./routes/marca');

var app = express();
app.use(cors);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/localidades', localidadesRouter);
app.use('/marca', marcaRouter);
app.use('/categoria', categoriaRouter);

app.use(function (req, res, next) {
  next(createError(404));
});
app.use(errorMiddware);

module.exports = app;
