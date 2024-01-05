import express from "express"
import merchController from "../controllers/merchController.js";

const merchRouter = express.Router();


merchRouter.get('/', merchController.getAllMerch);
merchRouter.post('/addmerch', merchController.createMerch);
merchRouter.post('/deletemerch', merchController.deleteMerch);
merchRouter.put('/updatemerch/:id', merchController.updateMerch);
merchRouter.get('/merchID', merchController.getMerchById);

export default merchRouter;