const Transport = require('../models/transportModel');
const factory = require('../controllers/handlerFactory');



module.exports = {
	getTransport: factory.getOne(Transport),
	getAllTransports: factory.getAll(Transport),
	createTransport: factory.createOne(Transport),
	updateTransport: factory.updateOne(Transport),
	deleteTransport: factory.deleteOne(Transport)
};