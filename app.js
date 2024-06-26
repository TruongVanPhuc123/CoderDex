var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var indexRouter = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);

app.use((req, res, next) => {
    const error = new Error('Error')
    error.statusCode = 404
    next(error);
})

app.use((err, req, res, next) => {
    res.status(err.statusCode).send(err.message)
})

module.exports = app;
