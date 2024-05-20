const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

function getHomePage(req, res, next){
	res.status(200)
		.render('index.html');
}

async function getDashboard(req, res, next){
	res.status(200)
		.render('app.html');
}


module.exports = {
	getHomePage,
	getDashboard: catchAsync(getDashboard)
};