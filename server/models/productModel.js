const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please provide product name'],
		trim: true,
		maxLength: [30, 'Product Name must have less or equal than 30 characters'],
		minLength: [2, 'Product Name must have more or equal than 2 characters']
	},
	companyId: {
		type: mongoose.Schema.ObjectId,
		ref: 'Company',
		required: [true, 'Please provide Company ID']
	},
	description: {
		type: String,
		trim: true
	},
	price: {
		type: Number,
		min: [0.01, 'Price ({VALUE}) is below the minimum allowed ({MIN}).'],
		required: [true, 'Please provide product price'],
	},
	stockQuantity: {
		type: Number,
		required: [true, 'Please provide quantity in stock']
	},
	createdAt: {
		type: Date,
		default: Date.now()
	},
	createdBy: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: [true, 'Please provide user ID']
	},
	imgUrl: {
		type: [String],
		default: ['placeholder-product-img.jpg']
	},
	weight: {
		type: Number,
		required: [true, 'Please provide product weight in kg'],
		min: [0.001, 'Weight ({VALUE}) is below the minimum allowed ({MIN}) kg.']
	},
	dimensions: {
		type: [Number],
		required: [true, 'Please provide product dimensions in meters (length, breadth, height)'],
	},
	warehouseId: {
		type: mongoose.Schema.ObjectId,
		ref: 'Warehouse',
		required: [true, 'Please provide warehouse ID']
	}
});

/*********************** MIDDLEWARES ***********************/
productSchema.pre(/^find/, function(next){
	this.select('-__v');
	next();
});


const ProductModel = mongoose.model('Product', productSchema);
module.exports = ProductModel;