const fs = require('fs');
const mongoose = require('mongoose');

const jsonConstants = fs.readFileSync(`${__dirname}/../../constants.json`, 'utf-8');
const constants = JSON.parse(jsonConstants);
const {MAX_COMPANY_NAME_LENGTH, MAX_ADDRESS_LENGTH, MIN_ADDRESS_LENGTH} = constants;

const companySchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please provide Company Name'],
		trim: true,
		maxLength: [MAX_COMPANY_NAME_LENGTH, 'Name must have less or equal than 30 characters'],
		minLength: [2, 'Name must have more or equal than 2 characters']
	},
	address: {
		type: String,
		trim: true,
		required: [true, 'Please provide company address'],
		maxLength: [MAX_ADDRESS_LENGTH, `An address must have less or equal than ${MAX_ADDRESS_LENGTH} characters`],
		minLength: [MIN_ADDRESS_LENGTH, `An address must have more or equal than ${MIN_ADDRESS_LENGTH} characters`]
	}
});

/*********************** MIDDLEWARES ***********************/
companySchema.pre(/^find/, function(next){
	this.select('-__v');
	next();
});


const CompanyModal = mongoose.model('Company', companySchema);
module.exports = CompanyModal;