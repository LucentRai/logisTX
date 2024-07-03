const express = require('express');
const devController = require('../controllers/devController');

const router = express.Router();

router.route('/import')
	.post(devController.importAllRecords);

router.route('/')
	.delete(devController.deleteAllRecords);

module.exports = router;