const mongoose = require('mongoose');

const companySchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please provide Company Name'],
		trim: true,
		maxLength: [30, 'Name must have less or equal than 30 characters'],
		minLength: [2, 'Name must have more or equal than 2 characters']
	},
	address: {
		type: String,
		trim: true,
		required: [true, 'Please provide company address'],
		maxLength: [100, 'An address must have less or equal than 100 characters'],
		minLength: [4, 'An address must have more or equal than 4 characters']
	},
	warehouses: [{
		type: mongoose.Schema.ObjectId,
		ref: 'Warehouse'
	}],
	transports: [{
		type: mongoose.Schema.ObjectId,
		ref: 'Transport'
	}]
});

/*********************** MIDDLEWARES ***********************/
companySchema.pre(/^find/, function(next){
	this.select('-__v');
	next();
});


const CompanyModal = mongoose.model('Company', companySchema);
module.exports = CompanyModal;