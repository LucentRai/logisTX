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

var models = {
	company: {
		names: ['company', 'companies'],
		modelFile: 'companyModel',
		dataFile: 'companies.json'
	},
	customer: {
		names: ['customer', 'customers'],
		modelFile: 'customerModel',
		dataFile: 'customers.json'
	},
	order: {
		names: ['order', 'orders'],
		modelFile: 'orderModel',
		dataFile: 'orders.json'
	},
	product: {
		names: ['product', 'products'],
		modelFile: 'productModel',
		dataFile: 'products.json'
	},
	transport: {
		names: ['transport', 'transports'],
		modelFile: 'transportModel',
		dataFile: 'transports.json'
	},
	warehouse: {
		names: ['warehouse', 'warehouses'],
		modelFile: 'warehouseModel',
		dataFile: 'warehouses.json'
	},
};

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
			console.log('Importing all data');
			await importAllData();
			process.exit();
		}
		for(const collection of collections) {
			switch(collection) {
				case 'company': case 'companies':
					const companies = JSON.parse(fs.readFileSync(`${__dirname}/data/companies.json`, 'utf-8'));
					models.company = require('../models/companyModel');
					await models.company.create(companies);
					console.log('Companies imported successfully');
					break;

				case 'customer': case 'customers':
					const customers = JSON.parse(fs.readFileSync(`${__dirname}/data/customers.json`, 'utf-8'));
					models.customer = require('../models/customerModel');
					await models.customer.create(customers);
					console.log('Customers imported successfully');
					break;

				case 'order': case 'orders':
					const orders = JSON.parse(fs.readFileSync(`${__dirname}/data/orders.json`, 'utf-8'));
					models.order = require('../models/orderModel');
					await models.order.create(orders);
					console.log('Orders imported successfully');
					break;

				case 'product': case 'products':
					const products = JSON.parse(fs.readFileSync(`${__dirname}/data/products.json`, 'utf-8'));
					models.product = require('../models/productModel');
					await models.product.create(products);
					console.log('Products imported successfully');
					break;

				case 'transport': case 'transports':
					const transports = JSON.parse(fs.readFileSync(`${__dirname}/data/transports.json`, 'utf-8'));
					models.transport = require('../models/transportModel');
					await models.transport.create(transports);
					console.log('Transports imported successfully');
					break;

				case 'user': case 'users':
					const users = JSON.parse(fs.readFileSync(`${__dirname}/data/users.json`, 'utf-8'));
					models.user = require('../models/userModel');
					await models.user.create(users);
					console.log('Users imported successfully');
					break;

				case 'warehouse': case 'warehouses':
					const warehouses = JSON.parse(fs.readFileSync(`${__dirname}/data/warehouses.json`, 'utf-8'));
					models.warehouse = require('../models/warehouseModel');
					await models.warehouse.create(warehouses);
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

async function deleteData(collections) {
	try {
		requireAllJSON();
		if(collections.includes('all')) {
			console.log('Deleting all data');
			await models.company.deleteMany();
			console.log('Companies data deleted');
			await models.customer.deleteMany();
			console.log('Customers data deleted');
			await models.order.deleteMany();
			console.log('Orders data deleted');
			await models.product.deleteMany();
			console.log('Products data deleted');
			await models.transport.deleteMany();
			console.log('Tranports data deleted');
			await models.user.deleteMany();
			console.log('Users data deleted');
			await models.warehouse.deleteMany();
			console.log('Warehouses data deleted');
			process.exit();
		}
		for(const collection of collections) {
			switch(collection) {
				case 'companies': case 'company':
					await models.company.deleteMany();
					console.log('Companies data deleted successfully');
					break;

				case 'customers': case 'customer':
					await models.customer.deleteMany();
					console.log('Customers data deleted successfully');
					break;

				case 'order': case 'order':
					await models.order.deleteMany();
					console.log('Orders data deleted successfully');
					break;

				case 'products': case 'product':
					await models.product.deleteMany();
					console.log('Products data deleted successfully');
					break;

				case 'transports': case 'transport':
					await models.transport.deleteMany();
					console.log('Transports data deleted successfully');
					break;

				case 'users': case 'user':
					await models.user.deleteMany();
					console.log('Users data deleted successfully');
					break;

					case 'warehouses': case 'warehouse':
						await models.warehouse.deleteMany();
						console.log('Warehouses data deleted successfully');
						break;

				default:
					throw new Error(`Invalid collection name: ${collection}`);
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
	requireAllJSON();
	const companies = JSON.parse(fs.readFileSync(`${__dirname}/data/companies.json`, 'utf-8'));
	const customers = JSON.parse(fs.readFileSync(`${__dirname}/data/customers.json`, 'utf-8'));

	await CategoryModel.create(companies);
	console.log('Categories imported');
	await DesignationModel.create(designations);
	console.log('Employee Designations imported');
	await EmployeeModel.create(employees);
	console.log('Employees imported');
	// await ExpenseModel.create(expenses);
	// console.log('Expenses imported');
	await FeeModel.create(fees);
	console.log('Fees imported');
	await GradeModel.create(grades);
	console.log('Grades imported');
	// await ParentModel.create(parents);
	// console.log('Parents imported');
	// await RevenueModel.create(revenues);
	// console.log('Revenues imported');
	// await StudentModel.create(students);
	// console.log('Students imported');
	await UserModel.create(users);
	console.log('Users imported \n\nAll data imported successfully');
}

function requireAllJSON() {
	models.company = require('../models/companyModel');
	models.customer = require('../models/customerModel');
	models.order = require('../models/orderModel');
	models.product = require('../models/productModel');
	models.transport = require('../models/transportModel');
	models.user = require('../models/userModel');
	models.warehouse = require('../models/warehouseModel');
}