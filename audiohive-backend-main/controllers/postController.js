import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//GET Posts Function

async function getPosts(req,res){
    try {
        const getposts = await prisma.posts.findMany()

        if (getposts){
           res.send(getposts)

        }
    } catch(err){
        // res.send(err, "Service Error")
        console.error(err)
        res.status(500).json({error: "error."})
    }
}

//add post (ga error pa)
async function addPost(req, res, next) {
    const posting = req.body;
    const profileId = 1; // Replace with the actual profile ID of the user making the post
  
    try {
      const createdPost = await prisma.posts.create({
        data: {
          content: posting.content,
          profile: { connect: { id: profileId } },
        },
      });
  
      res.status(200).json({ message: 'Update Posted.', post_ID: createdPost.post_ID });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error' });
    }
  }

async function getPostsByUserId(req, res, next) {
    const profileId = 1; // Replace with the actual profile ID of the user
  
    try {
      const posts = await prisma.posts.findMany({
        where: {
          profileId: profileId,
        },
      });
  
      res.status(200).json({ posts: posts });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error' });
    }
  }


const postController = { getPosts, addPost , getPostsByUserId}

export default postController;