const mongoose = require('mongoose');

const transportSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please provide transport name'],
		trim: true,
		maxLength: [30, 'Transport name must have less or equal than 30 characters'],
		minLength: [2, 'Transport name must have more or equal than 2 characters']
	},
	companyId: {
		type: mongoose.Schema.ObjectId,
		ref: 'Company',
	},
	volume: {
		type: Number,
		required: [true, 'Please provide transport volume capacity in cubic meters'],
		min: [1, 'The value of volume ({VALUE}) is below the minimum allowed ({MIN}).']
	},
	maxCapacity: {
		type: Number,
		required: [true, 'Please provide transport max carrying capacity in KG'],
		min: [5, 'The value of max weight capacity ({VALUE}) is below the minimum allowed ({MIN}).']
	},
	maxSpeed: {
		type: Number,
		required: [true, 'Please provide transport max speed in KM/H'],
		min: [30, 'The value of max speed ({VALUE}) is below the minimum allowed ({MIN}).']
	},
	parkingLocation: {
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
transportSchema.pre(/^find/, function(next){
	this.select('-__v');
	next();
});


const TransportModal = mongoose.model('Transport', transportSchema);
module.exports = TransportModal;