const Order = require('../models/orderModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const factory = require('../controllers/handlerFactory');



module.exports = {
	getOrder: factory.getOne(Order, [
		{path: 'orderItems', select: 'name warehouseId'},
		{path: 'customerId', select: 'name address'}
	]),
	getAllOrders: factory.getAll(Order, [
		{path: 'orderItems', select: 'name'},
		{path: 'customerId', select: 'name'}
	]),
	createOrder: factory.createOne(Order),
	updateOrder: factory.updateOne(Order),
	deleteOrder: factory.deleteOne(Order)
};