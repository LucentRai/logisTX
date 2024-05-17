const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const userRouter = express.Router();

userRouter.post('/login', authController.login);
userRouter.post('/logout', authController.logout);
userRouter.post('/signup', authController.signup);

/*********************** CHECK LOGIN ***********************/
userRouter.use(authController.protectRoute);

/***********************  OPERATION ON MYSELF ***********************/
userRouter.get('/me', userController.getMe, userController.getUser);
userRouter.patch('/updatePassword', authController.updatePassword);
userRouter.patch('/updateMe', userController.updateMe);
userRouter.delete('/deleteMe', userController.deleteMe);

/*********************** OPERATION ON OTHER USER ***********************/
userRouter.route('/')
	.get(userController.getAllUsers)
	.post(userController.postUser); // Returns error message and asks to use register page
userRouter.get('/:id', userController.getUser);

// userRouter.delete('/:id', userController.deleteUser);
// userRouter.patch('/:id', userController.updateUser);


module.exports = userRouter;