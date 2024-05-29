const User = require('../models/userModel');
const authController = require('./authController');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const factory = require('../controllers/handlerFactory');


async function deleteMe(req, res, next){
	await User.findByIdAndUpdate(req.userInfo._id, {active: false});
	authController.logout(req, res);
}

function filterRequestBody(body, ...allowedFields){
	const newObj = {};

	Object
		.keys(body)
		.forEach(el => {
			if(allowedFields.includes(el)){
				newObj[el] = body[el];
			}
		});

	return newObj;
}

function postUser(req, res){
	res
		.status(500)
		.json({
			status: "fail",
			message: "This route is not yet defined. Please use register page"
		});
}

async function updateMe(req, res, next){
	// if user POSTs password data
	if(req.body.password){
		return next(new AppError('This route is not for updating passwords. Please use /updatePassword'), 400);
	}

	// filter unwanted req body fields
	const filteredBody = filterRequestBody(req.body, 'firstname', 'middlename', 'lastname', 'phone', 'address', 'email');
	if(req.file){
		filteredBody.photo = req.file.filename;
	}

	// update user document
	const updatedUser = await User.findByIdAndUpdate(req.userInfo._id, filteredBody, {new: true, runValidators: true});

	res
		.status(200)
		.json({
			status: 'success',
			user: updatedUser
		});
}


module.exports = {
	deleteMe: catchAsync(deleteMe),
	getAllUsers: factory.getAll(User),
	getMe: factory.getMe,
	getUser: factory.getOne(User),
	postUser,
	updateMe: catchAsync(updateMe)
};