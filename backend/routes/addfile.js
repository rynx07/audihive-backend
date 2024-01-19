import express from 'express';
import addfileController from "../controllers/addfileController.js";
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

router.post('/addfile', upload.single('file'), addfileController.addFile);
router.get('/latest', addfileController.getLatestFile);

export default router;
