const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = mongoose.Schema({
	firstname: {
		type: String,
		required: [true, 'Please provide firstname'],
		trim: true,
		maxLength: [30, 'A firstname must have less or equal than 30 characters'],
		minLength: [2, 'A firstname must have more or equal than 2 characters']
	},
	middlename: {
		type: String,
		trim: true,
		maxLength: [30, 'A middlename must have less or equal than 30 characters'],
	},
	lastname: {
		type: String,
		required: [true, 'Please provide lastname'],
		trim: true,
		maxLength: [30, 'A lastname must have less or equal than 30 characters'],
		minLength: [2, 'A lastname must have more or equal than 2 characters']
	},
	address: {
		type: String,
		trim: true,
		maxLength: [100, 'An address must have less or equal than 100 characters'],
		minLength: [4, 'An address must have more or equal than 4 characters']
	},
	role: {
		type: String,
		required: [true, 'Please provide the role of user'],
		trim: true
	},
	email: {
		type: String,
		validate: [validator.isEmail, 'Please provide a valid email'],
		required: [true, 'Please provide your email'],
		trim: true
	},
	phone: {
		type: String,
		required: [true, 'Please provide your phone number'],
		unique: true,
		trim: true,
		maxLength: [15, 'A phone number must have less or equal than 15 characters'],
		minLength: [10, 'A phone number must have more or equal than 10 characters'],
		match: [/^[0-9]+$/, 'Please provide a valid phone number']
	},
	password: {
		type: String,
		required: [true, 'Please provide your password'],
		minlength: [8, 'A password must have more or equal than 8 characters'],
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