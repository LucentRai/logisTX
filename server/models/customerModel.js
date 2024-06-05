const fs = require('fs');
const mongoose = require('mongoose');

const jsonConstants = fs.readFileSync(`${__dirname}/../../constants.json`, 'utf-8');
const {MIN_ADDRESS_LENGTH, MAX_ADDRESS_LENGTH, MAX_NAME_LENGTH, MIN_NAME_LENGTH, PHONE_REGEX} = JSON.parse(jsonConstants);;
const phoneRegexPattern = new RegExp(PHONE_REGEX);

const customerSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please provide customer name'],
		trim: true,
		maxLength: [MAX_NAME_LENGTH, `A customer name must have less or equal than ${MAX_NAME_LENGTH} characters`],
		minLength: [MIN_NAME_LENGTH, `A customer name must have more or equal than ${MIN_NAME_LENGTH} characters`]
	},
	companyId: {
		type: mongoose.Schema.ObjectId,
		required: [true, 'Please provide company ID'],
		ref: 'Company'
	},
	address: {
		type: String,
		trim: true,
		minLength: [MIN_ADDRESS_LENGTH, `An address must have more or equal than ${MIN_ADDRESS_LENGTH} characters`],
		maxLength: [MAX_ADDRESS_LENGTH, `An address must have less or equal than ${MAX_ADDRESS_LENGTH} characters`]
	},
	phone: {
		type: String,
		required: [true, 'Please provide your phone number'],
		unique: true,
		trim: true,
		match: [phoneRegexPattern, 'Please provide a valid phone number']
	},
	location: {
		type: [Number],
		required: true,
		validate: {
			validator: function(value) {
				return value.length === 2 &&
							 value[0] >= -90 && value[0] <= 90 &&  // Latitude must be between -90 and 90
							 value[1] >= -180 && value[1] <= 180;  // Longitude must be between -180 and 180
			},
			message: props => `Invalid coordinates: [${props.value}]. Latitude must be between -90 and 90, and longitude must be between -180 and 180.`
		}
	},
});

/*********************** MIDDLEWARES ***********************/
customerSchema.pre(/^find/, function(next){
	this.select('-__v');
	next();
});

const CustomerModel = mongoose.model('Customer', customerSchema);
module.exports = CustomerModel;