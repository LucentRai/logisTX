const fs = require('fs');
const mongoose = require('mongoose');

const jsonConstants = fs.readFileSync(`${__dirname}/../../constants.json`, 'utf-8');
const {ORDER_STATUS, PAYMENT_METHODS} = JSON.parse(jsonConstants);

const orderSchema = mongoose.Schema({
	companyId: {
		type: mongoose.Schema.ObjectId,
		ref: 'Company',
	},
	customerId: {
		type: mongoose.Schema.ObjectId,
		ref: 'Customer',
	},
	destination: {
		type: [Number],
		required: true,
		validate: {
			validator: function(value) {
				console.log(value);
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
		enum: ORDER_STATUS
	},
	orderItems: {
		type: [mongoose.Schema.ObjectId],
		ref: 'Product'
	},
	paymentMethod: {
		type: String,
		enum: PAYMENT_METHODS,
		default: 'cash'
	}
});

/*********************** MIDDLEWARES ***********************/
orderSchema.pre(/^find/, function(next){
	this.select('-__v');
	next();
});


const OrderModel = mongoose.model('Order', orderSchema);
module.exports = OrderModel;