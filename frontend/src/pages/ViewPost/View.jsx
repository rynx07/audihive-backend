import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavBar from "../../components/Navigation/navBar";
import SendIcon from '@mui/icons-material/Send';
import "./viewPost.css";

const View = () => {
  const { post_ID } = useParams();
  const [post, setPost] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const [commentContent, setCommentContent] = useState("");
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [loadingComment, setLoadingComment] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false); // State for showing/hiding update form

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3005/api/posts/view/${post_ID}`
        );
        const { data } = response;
        setPost(data);
        setEditedContent(data.content);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [post_ID]);

  const handleDeletePost = async (post_ID) => {
    try {
      await axios.delete(
        `http://localhost:3005/api/posts/deletePost/${post_ID}`
      );
      console.log("Post deleted");
    } catch (error) {
      console.log("Delete post error", error);
    }
  };

  const handleUpdatePost = async () => {
    setLoadingUpdate(true);
    try {
      await axios.put(`http://localhost:3005/api/posts/updatepost/${post_ID}`, {
        postId: post_ID,
        content: editedContent,
      });
      console.log("Post updated successfully!");
      setLoadingUpdate(false);
      setShowUpdate(""); // Hide the update textarea after successful update
    } catch (error) {
      console.error("Error updating post:", error);
      setLoadingUpdate(false);
    }
  };

  const handleAddComment = async () => {
    setLoadingComment(true);
    try {
      const response = await axios.post(
        `http://localhost:3005/api/posts/addcomment/${post_ID}`,  // Updated URL with /${post_ID}
        {
          postId: post_ID,
          content: commentContent,  // Removing postId from the request body
        }
      );
  
      console.log("Comment added successfully!");
      setLoadingComment(false);
      setCommentContent(""); // Clear the comment textarea
      // Assuming the backend response contains the added comment details
      const addedComment = response.data.comment;
  
      // Optionally, update the state or UI with the new comment
      // For example, if you have a state for comments, you can update it like this:
      setPost((prevPost) => ({
        ...prevPost,
        comments: [...(prevPost.comments || []), addedComment],
      }));
    } catch (error) {
      console.error("Error adding comment:", error);
      setLoadingComment(false);
    }
  };
  
  

  
  

  return (
    <>
      <NavBar />
      <div className="postContainer">
        {post ? (
          <>
            <div className="postBody">
              {post.profile && (
                <>
                  <div className="userHolder">
                    <h1 className="postName">
                      {post.profile.firstname} {post.profile.lastname} (@{post.profile.username})
                    </h1>
                    <p className="userCategory">{post.profile.category}</p>
                  </div>
                </>
              )}

              <p className="postContent">{post.content}</p>

              {/* Toggle Update Post Form */}
              <button onClick={() => setShowUpdate(!showUpdate)}>
                {showUpdate ? "Hide Update Form" : "Show Update Form"}
              </button>

              {/* Update Post Form */}
              {showUpdate && (
                <>
                  <textarea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    rows={4}
                    cols={50}
                  />
                  <button onClick={handleUpdatePost} disabled={loadingUpdate}>
                    {loadingUpdate ? "Updating Post..." : "Update Post"}
                  </button>
                </>
              )}

              <div className="comment-section">
                <textarea
                  className="form-control"
                  type="text"
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  placeholder="Add a comment"
                />
                <label className="form-label" htmlFor="textAreaExample"></label>
                <div className="float-end mt-2 pt-1">
                  {loadingComment ? (
                    <span>Adding Comment...</span>
                  ) : (
                    <SendIcon
                      onClick={handleAddComment}
                      disabled={loadingComment}
                      className="send-icon"
                      style={{fontSize:"32px"}}
                    />
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </>
  );
};

export default View;
