const express = require('express');
const path = require('path');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const cookieParser = require('cookie-parser');
const compresssion = require('compression');

const AppError = require('./utils/AppError');
const globalErrorHandler = require('./controllers/errorController');



const app = express();

// Serving static files
app.use(express.static(path.join(__dirname, 'public'))); // all static files will be served through public directory

// Logging in development
if(process.env.NODE_ENV === 'development'){
	const morgan = require('morgan');
	app.use(morgan('dev'));
}

/*** MIDDLEWARE ***/
app.use(compresssion());

// Restrict requests to avoid DOS attacks
app.use('/api', rateLimit({
	max: 100, // maximum number of requests from 1 IP in certain window of time
	windowMs: 60 * 60 * 100, // Window in milli seconds
	message: 'Too many requests from this IP, please try again in 1 hour'
}));

// Reading data from body into request.body
app.use(express.json({limit: '10kb'})); // limits the size of request data
app.use(cookieParser()); // parse data from cookie

// Data sanitization to prevent NoSQL injections
app.use(mongoSanitize()); // replaces mongo operators from user input

// Data sanitization against XSS attacks
app.use(xss());


/**** ROUTES ****/

// for unhandled routes
app.all('*', (request, response, next) => {
	next(new AppError(`Cannot find ${request.originalUrl} on the server`, 404));
});

// GLOBAL ERROR HANDLER
app.use(globalErrorHandler);

module.exports = app;