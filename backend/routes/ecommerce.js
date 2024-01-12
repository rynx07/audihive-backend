import express from "express";
import ecommerceController from "../controllers/ecommerceController.js";

const ecommerceRouter = express.Router();

ecommerceRouter.post("/addproduct", ecommerceController.addProduct);
ecommerceRouter.get("/products", ecommerceController.getAllProducts);
ecommerceRouter.get("/userproducts", ecommerceController.getUserProduct);
ecommerceRouter.get("/product/:id", ecommerceController.getProductById);
ecommerceRouter.put("/updatemerch/:id", ecommerceController.updateMerch);
ecommerceRouter.delete("/deletemerch/:id", ecommerceController.deleteProduct);
ecommerceRouter.post("/buymerch", ecommerceController.buyMerch);
ecommerceRouter.post("/confirm", ecommerceController.confirmOrder);

export default ecommerceRouter;
