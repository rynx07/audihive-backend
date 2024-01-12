import express from "express";
import fileController from "../controllers/fileController.js";

const fileRouter = express.Router();

fileRouter.get("/uploadedfiles", fileController.getAllFiles);
fileRouter.post("/upload", fileController.handleFileUpload, fileController.addFileToDatabase);
// fileRouter.get("/:fileId", fileController.getFileById);
// fileRouter.delete("/delete/:fileId", fileController.deleteFile);
// fileRouter.put("/update/:fileId", fileController.updateFile);

export default fileRouter;
