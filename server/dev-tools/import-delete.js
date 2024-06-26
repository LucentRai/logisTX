const {Command} = require('commander');
const dotenv = require('dotenv');
const fs = require('fs');
const mongoose = require('mongoose');

dotenv.config({path: `${__dirname}/../config.env`});

mongoose.set('strictQuery', true);
mongoose
	.connect(process.env.DB_LOCAL)
	.then(() => console.log('Database Connected'))
	.catch(err => console.error(err));


const program = new Command();

program
	.name('import-delete')
	.description('Import or Delete data from logisTX database')
	.option('-s, --server', "Connect to the database server; if it's not mentioned, it will connect to the local database")
	.version('1.0.0');

program.parse();
const options = program.opts();

if(options.server) {
	console.log('Connecting to remote database server');
	databaseServer = process.env.DB.replace('<password>', process.env.DB_PASSWORD);
}

var models = [
	company = {
		names: ['company', 'companies'],
		modelFile: 'companyModel',
		dataFile: 'companies.json',
		model: null
	},
	customer = {
		names: ['customer', 'customers'],
		modelFile: 'customerModel',
		dataFile: 'customers.json',
		model: null
	},
	order = {
		names: ['order', 'orders'],
		modelFile: 'orderModel',
		dataFile: 'orders.json',
		model: null
	},
	product = {
		names: ['product', 'products'],
		modelFile: 'productModel',
		dataFile: 'products.json',
		model: null
	},
	transport = {
		names: ['transport', 'transports'],
		modelFile: 'transportModel',
		dataFile: 'transports.json',
		model: null
	},
	user = {
		names: ['user', 'users'],
		modelFile: 'userModel',
		dataFile: 'users.json',
		model: null
	},
	warehouse = {
		names: ['warehouse', 'warehouses'],
		modelFile: 'warehouseModel',
		dataFile: 'warehouses.json',
		model: null
	},
];

const inputDescription = `Import a collection into the database;
Collections include ${Object.keys(models).join(', ')}.
If no collection is mentioned, all collections will be imported`;

program.command('import')
	.description(inputDescription)
	.argument('[collection...]', 'Data to import', 'all')
	.action(collection => {
		importData(collection);
});

const deleteDescription = `Delete all data of collection from the database
Collections includes ${Object.keys(models).join(', ')}.
If no collection is mentioned, all collections will be deleted`;

program.command('delete')
	.description(deleteDescription)
	.argument('[collection...]', 'Data to delete', 'all')
	.action(collection => {
		deleteData(collection);
});

program.parse();


/************************* HELPER FUNCTIONS *************************/

async function importData(collections){
	try{
		if(collections.includes('all')) {
			await importAllData();
			process.exit();
		}
		for(const collection of collections) {
			for(let model of models){
				if(model.names.includes(collection)){
					const data = JSON.parse(fs.readFileSync(`${__dirname}/data/${model.dataFile}`, 'utf-8'));
					model.model = require(`../models/${model.modelFile}`);
					await model.model.create(data);
					console.log(`${model.names[0]} imported successfully`);
				}
			}
		}
	}
	catch(err) {
		console.error(err);
	}
	finally{
		process.exit();
	}
}

async function deleteData(collections) {
	try {
		if(collections.includes('all')) {
			await deleteAllData();
			process.exit();
		}
		for(const collection of collections) {
			for(let model of models){
				if(model.names.includes(collection)){
					model.model = require(`../models/${model.modelFile}`);
					await model.model.deleteMany();
					console.log(`${model.names[0]} deleted successfully`);
				}
			}
		}
	}
	catch(err) {
		console.error(err);
	}
	finally {
		process.exit();
	}
}


async function importAllData() {
	console.log('Importing all data');
	try{
		for(let model of models){
			const data = JSON.parse(fs.readFileSync(`${__dirname}/data/${model.dataFile}`, 'utf-8'));
			model.model = require(`../models/${model.modelFile}`);
			await model.model.create(data);
			console.log(`${model.names[0]} imported`);
		}
		console.log('All data imported successfully');
	}
	catch(err){
		console.error(err);
	}
}

async function deleteAllData(){
	console.log('Deleting all data');
	try{
		for(let model of models){
			model.model = require(`../models/${model.modelFile}`);
			await model.model.deleteMany();
			console.log(`${model.names[0]} deleted`);
		}
		console.log('All data deleted successfully');
	}
	catch(err) {
		console.error(err);
	}
}