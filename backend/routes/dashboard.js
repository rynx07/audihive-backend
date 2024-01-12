import express from "express";
import dashboardController from "../controllers/dashboardController.js";

const dashboardRouter = express.Router();

dashboardRouter.post("/recordpurchase", dashboardController.recordPurchase);
dashboardRouter.get("/earnings/:userId", dashboardController.getUserEarnings);

export default dashboardRouter;