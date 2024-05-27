const Product = require('../models/productModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const factory = require('../controllers/handlerFactory');



module.exports = {
	getProduct: factory.getOne(Product),
	getAllProducts: factory.getAll(Product),
	createProduct: factory.createOne(Product),
	updateProduct: factory.updateOne(Product),
	deleteProduct: factory.deleteOne(Product)
};