import express from "express"
import postController from "../controllers/postController.js";
const postsRouter = express.Router();

postsRouter.get('/', postController.getPosts);
postsRouter.post('/addpost', postController.addPost);
postsRouter.get('/userpost', postController.getPostsByUserId);

// postsRouter.post('/add', postController.addPosts);

export default postsRouter;