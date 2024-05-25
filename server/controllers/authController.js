const {promisify} = require('util');
const jwt = require('jsonwebtoken');

const Company = require('../models/companyModel');
const User = require('../models/userModel');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');



async function signup(req, res, next){
	const newCompany = await Company.create({
		name: req.body.company,
		address: req.body.address
	});

	const newUser = await User.create({
		firstname: req.body.firstname,
		middlename: req.body.middlename,
		lastname: req.body.lastname,
		role: req.body.role,
		companyId: newCompany._id,
		email: req.body.email,
		phone: req.body.phone,
		password: req.body.password,
	});


	sendTokenResponse(newUser, 201, res);
}

async function login(req, res, next){
	const {email, password} = req.body;

	if(!email || !password){ // check if email number or password exist
		return next(new AppError('Email and password required.', 400));
	}

	const user = await User.findOne({email}).select('password'); // explicitly mentioning to select password also
	if(!user || !(await user.isPasswordCorrect(password, user.password))){
		return next(new AppError('Email or password invalid', 401));
	}

	if(user.active === false){
		return next(new AppError('User is deactivated. Contact Administrator', 403));
	}

	sendTokenResponse(user, 200, res);
}

async function logout(req, res){
	res.cookie('jwt', 'loggedout', {
		expires: new Date(Date.now() + 10 * 1000),
		httpOnly: true
	});

	res.status(200)
		.json({
			status: "success"
		});
}

async function updatePassword(req, res, next){
	// Get user from collection
	const user = await User.findById(req.userInfo.id).select('+password'); // req.userInfo comes from protectRoute()

	// Check if POSTed current password is correct
	if(!(await user.isPasswordCorrect(req.body.currentPassword, user.password))){
		return next(new AppError('Incorrect password', 400));
	}

	// update password
	user.password = req.body.newPassword;
	await user.save(); // here User.findByIdAndUpdate() will not work as intended

	// Log user in, send JWT
	sendTokenResponse(user, 200, res);
}

async function protectRoute(req, res, next){
	let token;

	// check if JWT exits
	if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
		token = req.headers.authorization.split(' ')[1];
	}
	else if(req.cookies.jwt){
		token = req.cookies.jwt;
	}

	if(!token){
		next(new AppError('Please login to view this page', 401));
	}

	// JWT Verification
	const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

	// if user is deleted
	const userInfo = await User.findById(decoded.id);
	if(!userInfo){
		return next(new AppError('The user no longer exists', 401));
	}

	// Grant Access to protected route
	req.userInfo = userInfo;
	res.locals.user = userInfo;
	next();
}

async function isLoggedIn(req, res, next){
	let token;

	try{
		if(req.cookies.jwt){
			token = req.cookies.jwt;
		}

		if(!token){
			return next();
		}

		// JWT Verification
		const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

		// if user is deleted
		const userInfo = await User.findById(decoded.id);
		if(!userInfo){
			return next();
		}

		// if password is changed after JWT was issued
		if(userInfo.changedPasswordAfter(decoded.iat)){ // iat: "issued at"
			return next();
		}

		res.locals.user = userInfo; // available to pug templates
	}
	catch(err){
		return next();
	}
	next();
}

function generateToken(id){
	return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRATION});
}


function sendTokenResponse(user, statusCode, res){
	const token = generateToken(user._id);

	const cookieOptions = {
		expires: new Date(Date.now() + process.env.JWT_EXPIRATION_JS * 24 * 60 * 60 * 1000),
		httpOnly: true // cookie cannot be accessed or modified by the browser
	}
	if(process.env.NODE_ENV === 'production'){
		cookieOptions.secure = true; // send cookie only on HTTPS
	}

	user.password = undefined; // remove password fields if selected

	res.cookie('jwt', token, cookieOptions);

	res
		.status(statusCode)
		.json({
			status: 'success',
			token,
			data: {user}
		});
}

module.exports = {
	signup: catchAsync(signup),
	isLoggedIn,
	login: catchAsync(login),
	logout: catchAsync(logout),
	protectRoute: catchAsync(protectRoute),
	updatePassword: catchAsync(updatePassword)
};