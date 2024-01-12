import React from 'react';
import { useNavigate } from 'react-router-dom';
import './posts.css'

const PostsList = ({ postsWithUsername }) => {
  const navigate = useNavigate();

  const sortedPosts = postsWithUsername.slice().reverse();

  return (
    <div className="postsContainer">
      <h2>Posts</h2>
      {sortedPosts.map((post) => (
        <div className="post" key={post.post_ID}>
          <div className='postName'>
              <div className="postUsername">{post.name} (@{post.username})</div>
              <p className='postCategory'> {post.category}  </p> </div>
            <p className="postText">{post.content}</p>
         
            {/* Add other elements as needed */}
        <button onClick={() => navigate(`/posts/view/${post.post_ID}`)}>View Post</button>
        </div>
      ))}
    </div>
  );
};

export default PostsList;
