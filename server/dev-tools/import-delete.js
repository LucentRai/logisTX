const {Command} = require('commander');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const {models, importData, deleteData} = require('./helper');

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


const modelNames = models.map(model => model.names[0]).join(', ');

const inputDescription = `Import a collection into the database;
Collections include ${modelNames}.
If no collection is mentioned, all collections will be imported`;

program.command('import')
	.description(inputDescription)
	.argument('[collection...]', 'Data to import', 'all')
	.action(collection => {
		importData(collection);
});

const deleteDescription = `Delete all data of collection from the database
Collections includes ${modelNames}.
If no collection is mentioned, all collections will be deleted`;

program.command('delete')
	.description(deleteDescription)
	.argument('[collection...]', 'Data to delete', 'all')
	.action(collection => {
		deleteData(collection);
});

program.parse();