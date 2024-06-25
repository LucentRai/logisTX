const Warehouse = require('../models/warehouseModel');
const factory = require('../controllers/handlerFactory');


module.exports = {
	getWarehouse: factory.getOne(Warehouse),
	getAllWarehouses: factory.getAll(Warehouse),
	createWarehouse: factory.createOne(Warehouse),
	updateWarehouse: factory.updateOne(Warehouse),
	deleteWarehouse: factory.deleteOne(Warehouse)
};