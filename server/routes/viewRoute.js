const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

const viewRouter = express.Router();

// viewRouter.get('/me', authController.protectRoute, viewController.getAccount);

// viewRouter.use(authController.isLoggedIn);

viewRouter.get('*', viewController.getHomePage);

module.exports = viewRouter;