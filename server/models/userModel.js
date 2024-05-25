const fs = require('fs');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const jsonConstants = fs.readFileSync(`${__dirname}/../../constants.json`, 'utf-8');
const constants = JSON.parse(jsonConstants);
const {MAX_NAME_LENGTH, MIN_NAME_LENGTH, PHONE_REGEX, MIN_PASSWORD_LENGTH} = constants;
const phoneRegexPattern = new RegExp(PHONE_REGEX);

const userSchema = mongoose.Schema({
	firstname: {
		type: String,
		required: [true, 'Please provide firstname'],
		trim: true,
		maxLength: [MAX_NAME_LENGTH, `A firstname must have less or equal than ${MAX_NAME_LENGTH} characters`],
		minLength: [MIN_NAME_LENGTH, `A firstname must have more or equal than ${MIN_NAME_LENGTH} characters`]
	},
	middlename: {
		type: String,
		trim: true,
		maxLength: [MAX_NAME_LENGTH, `A middlename must have less or equal than ${MAX_NAME_LENGTH} characters`],
	},
	lastname: {
		type: String,
		required: [true, 'Please provide lastname'],
		trim: true,
		maxLength: [MAX_NAME_LENGTH, `A lastname must have less or equal than ${MAX_NAME_LENGTH} characters`],
		minLength: [MIN_NAME_LENGTH, `A lastname must have more or equal than ${MIN_NAME_LENGTH} characters`]
	},
	role: {
		type: String,
		required: [true, 'Please provide the role of user'],
		trim: true
	},
	companyId: {
		type: mongoose.Schema.ObjectId,
		required: [true, 'Please provide company ID'],
		ref: 'Company'
	},
	email: {
		type: String,
		validate: [validator.isEmail, 'Please provide a valid email'],
		required: [true, 'Please provide your email'],
		unique: true,
		trim: true
	},
	phone: {
		type: String,
		required: [true, 'Please provide your phone number'],
		unique: true,
		trim: true,
		match: [phoneRegexPattern, 'Please provide a valid phone number']
	},
	password: {
		type: String,
		required: [true, 'Please provide your password'],
		minlength: [MIN_PASSWORD_LENGTH, `A password must have more or equal than ${MIN_PASSWORD_LENGTH} characters`],
		select: false
	},
	active: {
		type: Boolean,
		default: true,
		select: false
	},
	photo: {
		type: String,
		default: 'default.jpg'
	}
});

/*********************** MIDDLEWARES ***********************/
userSchema.pre(/^find/, function(next){
	this.select('-__v');
	next();
});

userSchema.pre('save', async function(next){
	// hash password if password field is modified
	if(!this.isModified('password')){
		next();
	}

	// 12 is the cost. Higher the cost, more CPU intensive
	this.password = await bcrypt.hash(this.password, 12);
	next();
});

userSchema.pre('findOneAndUpdate', async function(next){
	if(this._update.password){
		this._update.password = await bcrypt.hash(this._update.password, 12);
	}
	console.log(this);
	next();
});

/*********************** INSTANCE METHODS ***********************/
userSchema.methods.isPasswordCorrect = async function(inputPassword, actualPassword){
	return await bcrypt.compare(inputPassword, actualPassword);
}

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;