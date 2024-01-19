import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "../src/pages/Login.jsx";
import MainPage from "./pages/main/MainPage.jsx";
import RegistrationForm from "../src/pages/Register.jsx";
import NewsFeed from "./pages/Newsfeed/NewsFeed.jsx";
import Profile from "./pages/Profile/ProfilePage.jsx";
import ViewPost from "./pages/ViewPost/View.jsx";
import FileUpload from "./pages/TestUpload.jsx";
import EcommercePage from "./pages/EcommercePage.jsx";
import Main from "./pages/main/MainPage.jsx";
import HeaderPage from "../src/components/HeroPage/headerPage";
import Dashboard from "../src/components/Dashboard/dashboard.jsx";
import Purchase from "../src/components/Ecommerce/purchase.jsx";
import Confirm from "../src/components/Ecommerce/confirm.jsx"; 
import Chat from "../src/components/Chats/App.jsx"; 
import Files from "../src/components/AddFile/addfile.jsx"


const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HeaderPage />} />
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/mainpage" element={<Main user={user} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/posts/view/:post_ID" element={<ViewPost />} />
        <Route path="/upload" element={<FileUpload />} />
        <Route path="/ecommerce" element={<EcommercePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/purchase" element={<Purchase />} />
        <Route path="/confirm" element={<Confirm />} /> 
        <Route path="/chat" element={<Chat />} />
        <Route path="/addfile" element={<Files />} />
      </Routes>
    </Router>
  );
};

export default App;
