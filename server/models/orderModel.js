const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
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
	createdAt: {
		type: Date,
		default: Date.now()
	},
	updatedAt: {
		type: Date,
		default: Date.now()
	},
	status: {
		type: String,
		enum: ['pending', 'processing', 'completed']
	},
	orderItems: {
		type: [mongoose.Schema.ObjectId],
		ref: 'Product'
	}
});

/*********************** MIDDLEWARES ***********************/
orderSchema.pre(/^find/, function(next){
	this.select('-__v');
	next();
});


const OrderModel = mongoose.model('Order', orderSchema);
module.exports = OrderModel;