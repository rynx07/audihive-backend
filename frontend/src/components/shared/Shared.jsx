import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './shared.css';
import FileUpload from '../../components/FileManagement/FileManagement';
import { useNavigate } from 'react-router-dom';
const PostForm = () => {
  const [content, setContent] = useState('');
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const navigate = useNavigate();
  const [submittedPosts, setSubmittedPosts] = useState([]);

  useEffect(() => {
    const userDetailsFromStorage = JSON.parse(localStorage.getItem('userDetails')) || {};
    setUserDetails(userDetailsFromStorage);
    setLoggedInUserId(userDetailsFromStorage.user_ID);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3005/api/posts/addpost', {
        profileId: loggedInUserId,
        content,
      });
      const { data } = response;
      setSubmittedPosts([...submittedPosts, data]);
      console.log(data);
      navigate(0);
      // Display success message or perform additional actions
    } catch (error) {
      console.error(error);
      // Display error message or handle the error appropriately
    }

    setContent('');
  };

  useEffect(() => {
    const fetchSubmittedPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3005/api/posts');
        const { data } = response;
        setSubmittedPosts(data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3005/api/users/${loggedInUserId}`);
        const { data } = response;
        setUserDetails(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (loggedInUserId) {
      fetchSubmittedPosts();
      fetchUserDetails();
    }
  }, [loggedInUserId]);

  return (
    <div className="postFormContainer">
      <h3 className="postFormUserDetails">
       {userDetails.firstName} {userDetails.lastName}
      </h3>
      <form className="postForm" onSubmit={handleSubmit}>
        <textarea
          className="postFormTextarea" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write your post..." rows={4} cols={50}
        />
        <button className="postFormButton" type="submit">
          Post
        </button>
        <FileUpload />
      </form>
    </div>
  );
};
export default PostForm;