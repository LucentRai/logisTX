const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.createOne = Model =>
	catchAsync(async (req, res, next) => {
		const document = await Model.create(req.body);
		res
			.status(201)
			.json({
				status: "success",
				document
			});
	});

exports.getOne = (Model, populateOption) =>
	catchAsync( async (req, res, next) => {
		let query = Model.findById(req.params.id);
		if(populateOption){
			query = query.populate(populateOption);
		}
		const document = await query;

		if(!document){
			return next(new AppError(`No document with id ${req.params.id} found`, 404));
		}

		res
		.status(200)
		.json({
			status: "success",
			data: {
				document
			}
		});
});

exports.getAll = (Model, populateOption) =>
	catchAsync( async (req, res, next) => {
		// for nested GET reviews
		let filter = {};
		if(req.params.id){
			filter = {
				id: req.params.id
			};
		}

		const features = new APIFeatures(Model.find(filter), req.query)
			.filter()
			.sort()
			.limitFields()
			.paginate();

		if(populateOption){
			features.query = features.query.populate(populateOption);
		}

		// const document = await features.query.explain(); // for stats about query
		const documents = await features.query;
	
		res
			.status(200)
			.json({
				status: "success",
				result: documents.length,
				documents
			});
	});

exports.getMe = (req, res, next) => {
	req.params.id = req.userInfo._id;
	next();
};

exports.updateOne = Model =>
	catchAsync(async (req, res, next) => {
		const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
			new: true, // return modified document rather than the original
			runValidators: true
		});
		
		if(!document){
			return next(new AppError(`No document with id ${req.params.id} found`, 404));
		}
		res
			.status(200)
			.json({
				status: 'success',
				data: document
			});
	});

exports.deleteOne = Model =>
	catchAsync(async (req, res, next) => {
		const document = await Model.findByIdAndDelete(req.params.id);
		if(!document){
			return next(new AppError(`No document with id ${req.params.id} found.`), 404);
		}
		res.status(204).json();
	});