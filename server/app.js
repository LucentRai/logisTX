const express = require('express');
const path = require('path');
// const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const cookieParser = require('cookie-parser');
const compresssion = require('compression');

const AppError = require('./utils/AppError');
const globalErrorHandler = require('./controllers/errorController');


const app = express();


/****************************** MIDDLEWARES ******************************/
// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Restrict requests to avoid DOS attacks
// app.use('/api', rateLimit({
// 	max: 100, // maximum number of requests from 1 IP in certain window of time
// 	windowMs: 60 * 60 * 100, // Window in milli seconds
// 	message: 'Too many requests from this IP, please try again in 1 hour'
// }));

// Reading data from body into request.body
app.use(express.json({limit: '10kb'})); // limits the size of request data
app.use(cookieParser()); // parse data from cookie

// Data sanitization to prevent NoSQL injections
app.use(mongoSanitize()); // replaces mongo operators from user input


app.use(compresssion());


/****************************** ROUTERS ******************************/
const companyRouter = require('./routes/companyRoute');
const customerRouter = require('./routes/customerRoute');
const orderRouter = require('./routes/orderRoute');
const productRouter = require('./routes/productRoute');
const transportRouter = require('./routes/transportRoute');
const userRouter = require('./routes/userRoute');
const warehouseRouter = require('./routes/warehouseRoute');


/****************************** ROUTES ******************************/
app.use('/api/v1/companies', companyRouter);
app.use('/api/v1/customers', customerRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/transports', transportRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/warehouses', warehouseRouter);


if(process.env.NODE_ENV === 'development'){
	const morgan = require('morgan'); // Logging in development
	app.use(morgan('dev'));
	app.use('/api/v1/dev', require('./routes/devRoute'));
}

app.use('*', (req, res, next) => {
	next(new AppError(`Cannot find ${req.originalUrl} on the server`, 404));
});


// GLOBAL ERROR HANDLER
app.use(globalErrorHandler);

module.exports = app;