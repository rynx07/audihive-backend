import React from "react";
import NavBar from "../../components/Navigation/navBar";
import "./profile.css";

export default function Profile() {
  // Retrieve user details from localStorage
  const userDetails = JSON.parse(localStorage.getItem('userDetails'));
  const { firstname, lastname, category } = userDetails || {};

  return (
    <>
      <NavBar />
      <div className="profileInfo">
        <h4 className="profileInfoName">
          {firstname} {lastname}
        </h4>
        <p className="profileDesc">{category}</p>
      </div>
    </>
  );
}