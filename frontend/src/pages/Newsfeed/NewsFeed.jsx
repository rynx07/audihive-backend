import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Share from '../../components/shared/Shared';
import PostsList from '../../components/PostList/PostsList';
import axios from 'axios';
import FileUpload from '../../components/FileManagement/FileManagement'; // Import the FileUpload component
import './newsfeed.css'


const NewsFeed = () => {
  const navigate = useNavigate();
  const [submittedPosts, setSubmittedPosts] = useState([]);

  useEffect(() => {
    const fetchSubmittedPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3005/api/posts');
        const { data } = response;
        setSubmittedPosts(data);
        
      } catch (error) {
        console.error(error);
      }
    };

    fetchSubmittedPosts();
  }, []);

  // Retrieve user details from localStorage
  const userDetails = JSON.parse(localStorage.getItem('userDetails'));
  const { firstname, lastname } = userDetails || {};

  return (
    <>
   <div className="bodyContainer">
      {firstname && lastname ? (
        <div>
          <h1 className="welcome-msg">Welcome</h1>
          <Share />
          {/* <FileUpload /> Include the FileUpload component */}
          <PostsList postsWithUsername={submittedPosts} />
       
        </div>
      ) : (
        <p className="login-msg">User details not found. Please log in.</p>
      )}
    </div>
    </>
  );
  
};

export default NewsFeed;
