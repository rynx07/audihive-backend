import express from "express"
import userController from "../controllers/userController.js";
const usersRouter = express.Router();

//admin side routes
usersRouter.get('/', userController.getUsers);
usersRouter.post('/add', userController.addUser);
usersRouter.delete('/delete', userController.deleteUser);
usersRouter.put('/update', userController.updateUser);

//user side routes 
usersRouter.post('/register', userController.registerUser);
usersRouter.post('/login', userController.loginUser);


export default usersRouter;