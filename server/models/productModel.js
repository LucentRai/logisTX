const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please provide product name'],
		trim: true,
		maxLength: [30, 'Product Name must have less or equal than 30 characters'],
		minLength: [2, 'Product Name must have more or equal than 2 characters']
	},
	description: {
		type: String,
		trim: true
	},
	stockQuantity: {
		type: Number,
		required: [true, 'Please provide quantity in stock']
	},
	createdAt: {
		type: Date,
		default: Date.now()
	},
	imgUrl: [{
		type: String,
	}],
	weight: {
		type: Number,
		required: [true, 'Please provide product weight in kg'],
		min: [0.01, 'Weight ({VALUE}) is below the minimum allowed ({MIN}) kg.']
	},
	dimensions: [{
		type: Number,
		required: [true, 'Please provide product dimensions']
	}]
});

/*********************** MIDDLEWARES ***********************/
productSchema.pre(/^find/, function(next){
	this.select('-__v');
	next();
});


const ProductModel = mongoose.model('Product', productSchema);
module.exports = ProductModel;