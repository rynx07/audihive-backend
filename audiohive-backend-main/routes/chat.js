import express from "express";
import chatController from "../controllers/chatController.js";

const chatRouter = express.Router();

chatRouter.post('/create', chatController.createChat);
chatRouter.get('/all', chatController.getChats);
chatRouter.delete('/delete/:id', chatController.deleteChat);

export default chatRouter;
