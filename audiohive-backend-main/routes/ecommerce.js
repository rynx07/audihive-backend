import express from "express";
import ecommerceController from "../controllers/ecommerceController.js";

const ecommerceRouter = express.Router();

ecommerceRouter.post("/addmerch", ecommerceController.addMerch);
ecommerceRouter.get("/usermerch", ecommerceController.getUserMerch);
ecommerceRouter.get("/merch/:id", ecommerceController.getMerchById);
ecommerceRouter.put("/updatemerch/:id", ecommerceController.updateMerch);
ecommerceRouter.delete("/deletemerch/:id", ecommerceController.deleteMerch);
ecommerceRouter.post("/buymech", ecommerceController.buyMerch);

export default ecommerceRouter;
