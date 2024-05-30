const Warehouse = require('../models/warehouseModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const factory = require('../controllers/handlerFactory');



module.exports = {
	getWarehouse: factory.getOne(Warehouse),
	getAllWarehouses: factory.getAll(Warehouse),
	createWarehouse: factory.createOne(Warehouse),
	updateWarehouse: factory.updateOne(Warehouse),
	deleteWarehouse: factory.deleteOne(Warehouse)
};