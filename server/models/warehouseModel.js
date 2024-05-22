const mongoose = require('mongoose');


const validateTimeFormat = (time) => {
	const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
	return timeRegex.test(time);
};

const validateOperatingHours = (hours) => {
	const days = Object.keys(hours);
	return days.every(day => {
		const { open, close } = hours[day];
		return validateTimeFormat(open) && validateTimeFormat(close) && open < close;
	});
};

const operatingHoursSchema = new Schema({
	monday: {
		open: { type: String, required: true },
		close: { type: String, required: true }
	},
	tuesday: {
		open: { type: String, required: true },
		close: { type: String, required: true }
	},
	wednesday: {
		open: { type: String, required: true },
		close: { type: String, required: true }
	},
	thursday: {
		open: { type: String, required: true },
		close: { type: String, required: true }
	},
	friday: {
		open: { type: String, required: true },
		close: { type: String, required: true }
	},
	saturday: {
		open: { type: String, required: true },
		close: { type: String, required: true }
	},
	sunday: {
		open: { type: String, required: true },
		close: { type: String, required: true }
	}
}, {
	_id: false,
	validate: {
		validator: validateOperatingHours,
		message: 'Invalid operating hours: Each day must have valid times in "HH:MM" format and the closing time must be after the opening time.'
	}
});


const warehouseSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please provide Warehouse name'],
		trim: true,
		maxLength: [30, 'Warehouse name must have less or equal than 30 characters'],
		minLength: [2, 'Warehouse name must have more or equal than 2 characters']
	},
	location: {
		type: [Number],
		required: true,
		validate: {
			validator: function(value) {
				return value.length === 2 &&
							 value[0] >= -90 && value[0] <= 90 &&  // Latitude must be between -90 and 90
							 value[1] >= -180 && value[1] <= 180;  // Longitude must be between -180 and 180
			},
			message: props => `Invalid coordinates: [${props.value}]. Latitude must be between -90 and 90, and longitude must be between -180 and 180.`
		}
	},
	companyId: {
		type: mongoose.Schema.ObjectId,
		ref: 'Company',
	},
	operatingHours: {
		type: operatingHoursSchema,
		required: [true, 'Please provide operating hours for the warehouse']
	}
});




/*********************** MIDDLEWARES ***********************/
warehouseSchema.pre(/^find/, function(next){
	this.select('-__v');
	next();
});


const WarehouseModal = mongoose.model('Warehouse', warehouseSchema);
module.exports = WarehouseModal;