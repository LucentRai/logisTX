const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

function getHomePage(req, res, next){
	res.status(200)
		.render('index.html');
}

async function getDashboard(req, res, next){
	const tours = await Tour.find();
	res.status(200)
		.render('overview', {
			title: 'All Tours',
			tours
		});
}


module.exports = {
	getHomePage,
	getDashboard: catchAsync(getDashboard)
};