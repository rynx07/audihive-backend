import React from "react";
// import Login from "./Login";
// import NavBar from "../components/Navigation/navBar";
import HeaderPage from "../../components/HeroPage/headerPage";
import NewsFeed from "../Newsfeed/NewsFeed";
import Announcement from "../../components/leftside/Announcements";
import NavBar from "../../components/Navigation/navBar";
import './mainpage.css'



export default function Main(){
    return(
        <>
            <NavBar />
        <div className="mainContainer">
            <Announcement />
            <NewsFeed />
        </div>
        </>
    )

};


