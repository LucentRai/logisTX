const Customer = require('../models/customerModel');
const factory = require('../controllers/handlerFactory');

module.exports = {
	getCustomer: factory.getOne(Customer),
	getAllCustomers: factory.getAll(Customer),
	createCustomer: factory.createOne(Customer),
	updateCustomer: factory.updateOne(Customer),
	deleteCustomer: factory.deleteOne(Customer)
};