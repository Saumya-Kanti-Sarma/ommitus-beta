import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Navbar.comp.css';
import toast from 'react-hot-toast';

const CustomerNavbar = () => {
  const { nameOfRestaurant, idOfRestaurant } = useParams();
  const navigate = useNavigate();

  // Function to toggle the togglebar
  const toggleSidebar = () => {
    toast.success("Feature will be added in the next Update")
  };


  return (
    <nav className="navbar">
      <div className="navbar-title">
        <h1
          style={{ cursor: "pointer" }}
          onClick={() => navigate(`/customer/restaurant/${nameOfRestaurant}/${idOfRestaurant}/home`)}
        >{nameOfRestaurant || "Name of restaurant"}</h1>
        <p>powered by Ommitus</p>
      </div>
      <img src="/hamburger.svg" onClick={toggleSidebar} alt="Menu" />

    </nav>
  );
};

export default CustomerNavbar;
