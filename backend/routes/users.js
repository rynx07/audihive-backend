import express from "express";
import userController from "../controllers/userController.js";
const usersRouter = express.Router();

// Admin side routes
usersRouter.get('/', userController.getUsers);
usersRouter.post('/add', userController.addUser);
usersRouter.delete('/delete', userController.deleteUser);
usersRouter.put('/update', userController.updateUser);

// User side routes
usersRouter.post('/register', userController.registerUser);
usersRouter.post('/login', userController.loginUser);
usersRouter.put('/changepassword', userController.changePassword); 
usersRouter.delete('/deleteuser', userController.deleteUser); 

// Search users route
usersRouter.get('/search', userController.searchUsers);

export default usersRouter;
