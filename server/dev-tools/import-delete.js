const {Command} = require('commander');
const dotenv = require('dotenv');
const fs = require('fs');
const mongoose = require('mongoose');

dotenv.config({path: `${__dirname}/../config.env`});


mongoose
	.connect(process.env.DB_LOCAL)
	.then(() => console.log('Database connected successfully'))
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

var model = {
	company,
	customerModel,
	orderModel,
	productModel,
	transportModel,
	warehouseModel
};

const inputDescription = `Import a collection into the database;
Collections include ${Object.keys(model).join(', ')}.
If no collection is mentioned, all collections will be imported`;

program.command('import')
	.description(inputDescription)
	.argument('[collection...]', 'Data to import', 'all')
	.action(collection => {
		importData(collection);
});

const deleteDescription = `Delete all data of collection from the database
Collections includes ${Object.keys(model).join(', ')}.
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
			console.log('Importing all data');
			await importAllData();
			process.exit();
		}
		for(const collection of collections) {
			switch(collection) {
				case 'company': case 'companies':
					const companies = JSON.parse(fs.readFileSync(`${__dirname}/data/companies.json`, 'utf-8'));
					model.company = require('../models/companyModel');
					await model.company.create(companies);
					console.log('Companies imported successfully');
					break;

				case 'customer': case 'customers':
					const customers = JSON.parse(fs.readFileSync(`${__dirname}/data/customers.json`, 'utf-8'));
					model.customer = require('../models/customerModel');
					await model.customer.create(customers);
					console.log('Customers imported successfully');
					break;

				case 'order': case 'orders':
					const orders = JSON.parse(fs.readFileSync(`${__dirname}/data/orders.json`, 'utf-8'));
					model.order = require('../models/orderModel');
					await model.order.create(orders);
					console.log('Orders imported successfully');
					break;

				case 'product': case 'products':
					const products = JSON.parse(fs.readFileSync(`${__dirname}/data/products.json`, 'utf-8'));
					model.product = require('../models/productModel');
					await model.product.create(products);
					console.log('Products imported successfully');
					break;

				case 'transport': case 'transports':
					const transports = JSON.parse(fs.readFileSync(`${__dirname}/data/transports.json`, 'utf-8'));
					model.transport = require('../models/transportModel');
					await model.transport.create(transports);
					console.log('Transports imported successfully');
					break;

				case 'user': case 'users':
					const users = JSON.parse(fs.readFileSync(`${__dirname}/data/users.json`, 'utf-8'));
					model.user = require('../models/userModel');
					await model.user.create(users);
					console.log('Users imported successfully');
					break;

				case 'warehouse': case 'warehouses':
					const warehouses = JSON.parse(fs.readFileSync(`${__dirname}/data/warehouses.json`, 'utf-8'));
					model.warehouse = require('../models/warehouseModel');
					await model.warehouse.create(warehouses);
					console.log('Warehouses imported successfully');
					break;

				default:
					throw new Error(`Invalid collection name: ${collection}`);
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