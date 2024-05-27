const Order = require('../models/orderModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const factory = require('../controllers/handlerFactory');



module.exports = {
	getOrder: factory.getOne(Order),
	getAllOrders: factory.getAll(Order),
	createOrder: factory.createOne(Order),
	updateOrder: factory.updateOne(Order),
	deleteOrder: factory.deleteOne(Order)
};