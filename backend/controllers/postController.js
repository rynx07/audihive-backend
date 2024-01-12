// Import the PrismaClient
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// GET Posts Function
async function getPosts(req, res) {
    try {
      const posts = await prisma.posts.findMany({
        include: {
          profile: true,
        },
      });
  
      const postsWithUsername = posts.map((post) => {
        return {
          post_ID: post.post_ID,
          content: post.content,
          profileId: post.profileId,
          username: post.profile.username,
          name: `${post.profile.firstname} ${post.profile.lastname} `,
          category: post.profile.category,
        };
      });
  
      res.status(200).json(postsWithUsername);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error' });
    }
  }

// Add post function gagana na ni at least ctrl + z nalang if mag dugang ka changes kag sala
async function addPost(req, res, next) {
    const posting = req.body;
    const profileId = posting.profileId;

    try {
        if (!profileId) {
            throw new Error("Invalid profileId");
        }

        const createdPost = await AddPostByID(profileId, posting.content);

        res.status(200).json({ message: 'Post added successfully.', post_ID: createdPost.post_ID });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error' });
    }
}




// Update post function
async function updatePost(req, res, next) {
    const {content} = req.body;
    const id = parseInt(req.params.post_ID);
    try {
        const updatedPost = await prisma.posts.update({
            where: {
                post_ID: id,
            },
            data: {
                content: content,
            },
        });

        res.status(200).json({ message: 'Post updated successfully.', post_ID: updatedPost.post_ID });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error' });
    }
}


// Delete post function
async function deletePost(req, res, next) {
  const id = parseInt(req.params.post_ID);

  
  try {
    const deletedPost = await prisma.posts.delete({
      where: {
        post_ID: id
      },
    });

    res.status(200).json({ message: 'Post deleted successfully.', deletedPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting post.' });
  }
}


async function deleteUserOwnPost(req, res, next) {
  const postId = parseInt(req.params.post_ID);
  const userId = req.user.id; // Assuming you have the authenticated user's ID

  try {
    const post = await prisma.posts.findUnique({
      where: {
        post_ID: postId,
      },
    });

    if (!post) {
      return res.status(404).json({ error: 'Post not found.' });
    }

    // Check if the post belongs to the authenticated user
    if (post.user_ID !== userId) {
      return res.status(403).json({ error: 'You are not authorized to delete this post.' });
    }

    // If the post belongs to the authenticated user, proceed with deletion
    const deletedPost = await prisma.posts.delete({
      where: {
        post_ID: postId,
      },
    });

    res.status(200).json({ message: 'Post deleted successfully.', deletedPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting post.' });
  }
}

// Add Post by User ID 
async function AddPostByID(userId, content) {
    try {
      const createdPost = await prisma.posts.create({
        data: {
          content: content,
          profile: {
            connect: { id: userId }
          }
        }
      });
  
      return createdPost;
    } catch (error) {
      throw new Error(`Failed to add post: ${error.message}`);
    }
  }


//Add Comment function 
async function addComment (req, res, next) {
  const { postId, content } = req.body; // Assuming postId and content are provided in the request body

  try {
    const profileId = req.user.id; // Get the authenticated user's ID

    if (!profileId || !postId || !content) {
      throw new Error("Invalid input data");
    }

    const createdComment = await AddCommentByUser(profileId, postId, content);

    res.status(200).json({ message: 'Comment added successfully.', comment: createdComment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error adding comment.' });
  }
}



  //Get Post By ID
  async function getPostById(req, res, next) {
    const postId = parseInt(req.params.post_ID); 
  
    try {
      const post = await prisma.posts.findUnique({
        where: { post_ID: postId },
        include: {
          profile: true,
        },
      });
  
      res.status(200).json(post);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error' });
    }
  }



const postController = { getPosts, addPost, updatePost, deletePost, AddPostByID, addComment, getPostById, deleteUserOwnPost};

export default postController;
