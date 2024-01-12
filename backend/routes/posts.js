import express from "express";
import postController from "../controllers/postController.js";
const postsRouter = express.Router();

postsRouter.get('/', postController.getPosts);
postsRouter.post('/addpost', postController.addPost);
postsRouter.put('/updatepost/:post_ID', postController.updatePost); // Use HTTP PUT for updates
postsRouter.delete('/deletepost/:post_ID', postController.deletePost);
postsRouter.post('/addUserPost', postController.AddPostByID);
postsRouter.get('/view/:post_ID', postController.getPostById);
postsRouter.delete('/deletePost/:post_ID', postController.deleteUserOwnPost);
postsRouter.post('/addcomment', postController.addComment);


export default postsRouter;
