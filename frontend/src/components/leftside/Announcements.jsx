import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './announce.css';
import Profile from '../../pages/Profile/ProfilePage';

const Announcement = () => {
  const userDetails = JSON.parse(localStorage.getItem('userDetails'));
  const { firstname, lastname, category } = userDetails || {};
  
  const linkStyle = {
    textDecoration: 'none', // Remove text decoration
    padding: '8px 12px',
    color: 'inherit', // Use the default color of the parent element
  };

  return (
    <>
    
      <div className='leftContainer'>
        <div className="ProfileSidebar">
          <div className="shareWrapper">
            <div className="shareTop">
            <Link to ='/profile' style={linkStyle}>
              <div className="test">
                {/* Display user details fetched from localStorage as placeholders */}
                <h1 className="userName">{firstname} {lastname}</h1>
                <span className="userCategory"> {category}</span>
              </div>
              </Link>

              <div className="horizontal-scroll">
            <h2>Upcoming Events</h2>
                    <div className="scroll-content">
                        <div className="scroll-item">1</div>
                        <div className="scroll-item">2</div>
                        <div className="scroll-item">3</div>
                        <div className="scroll-item">4</div>
                        <div className="scroll-item">5</div>
                    </div>
                </div>    

        <div className="horizontal-scroll">
            <h2> Trending Merch</h2>
                    <div className="scroll-content">
                        <div className="scroll-item">1</div>
                        <div className="scroll-item">2</div>
                        <div className="scroll-item">3</div>
                        <div className="scroll-item">4</div>
                        <div className="scroll-item">5</div>
                    </div>
                </div> 
            </div>
          </div>
          {/* ... other components or content ... */}
        </div>
      </div>
   
    </>
  );
};

export default Announcement;
