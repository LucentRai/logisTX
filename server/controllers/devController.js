const AppError = require('../utils/AppError');
const {importAllData, deleteAllData} = require('../dev-tools/helper');


async function importAllRecords(req, res, next){
	try{
		await importAllData();
		res.status(200).json();
	}
	catch(err){
		return next(new AppError(err, 500));
	}
}

async function deleteAllRecords(req, res, next){
	try{
		await deleteAllData();
		res.status(204).json();
	}
	catch(err){
		return next(new AppError(err, 500));
	}
}


module.exports = {
	importAllRecords,
	deleteAllRecords
};