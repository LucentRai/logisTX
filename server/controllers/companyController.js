const Company = require('../models/companyModel');
const factory = require('./handlerFactory');



module.exports = {
	getCompany: factory.getOne(Company),
	getAllCompanies: factory.getAll(Company),
	createCompany: factory.createOne(Company),
	updateCompany: factory.updateOne(Company),
	deleteCompany: factory.deleteOne(Company)
};