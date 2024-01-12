import "./nav.css";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";



export default function NavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication status and user details from localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userDetails');
    localStorage.clear(); // Clear the entire localStorage

    // Redirect to the login page after logout
    navigate('/');
  };



  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/mainpage" className="logo">
          {" "}
          AudioHive
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <SearchIcon className="search" />
          <input placeholder="Search..." className="searchInput" />
        </div>
      </div>

      <div className="topbarRight">
        <div className="topbarIcons">
          <ul>
            <li className="topbarIconItem">
              <CustomLink to="/mainpage">
                <HomeIcon style={{color: "#effefb"}}/>
              </CustomLink>
            </li>
            <li className="topbarIconItem">
              <CustomLink to="/calendar">
                <CalendarMonthIcon style={{color: "#effefb"}} />
              </CustomLink>
            </li>
            <li className="topbarIconItem">
              <CustomLink to="/ChatPage">
                <ChatIcon style={{color: "#effefb"}} />
              </CustomLink>
            </li>
            <li className="topbarIconItem">
              <CustomLink to="">
                <DashboardIcon style={{color: "#effefb"}} />
              </CustomLink>
            </li>
            <li className="topbarIconItem">
              <CustomLink to="/">
                <LogoutIcon style={{color: "#effefb"}}
                onClick={handleLogout} />
              </CustomLink>
            </li>
          </ul>
        </div>
        
      </div>
    </div>
  );
}

function CustomLink({ to, children, ...props }) {
  const path = window.location.pathname;

  return (
    <li className={path === to ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
