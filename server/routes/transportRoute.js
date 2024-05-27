const express = require('express');
const transportController = require('../controllers/transportController');

const router = express.Router();

router.route('/')
	.get(transportController.getAllTransports)
	.post(transportController.createTransport);

router.route('/:id')
	.get(transportController.getTransport)
	.patch(transportController.updateTransport)
	.delete(transportController.deleteTransport);

module.exports = router;