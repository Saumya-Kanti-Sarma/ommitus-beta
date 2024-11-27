import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Navbar.comp.css';

const CustomerNavbar = () => {
  const { nameOfRestaurant, idOfRestaurant } = useParams();
  const [isTogglebarVisible, setIsTogglebarVisible] = useState(false);
  const [activeLink, setActiveLink] = useState("Home"); // Tracks the active link
  const navigate = useNavigate();

  // Function to toggle the togglebar
  const toggleSidebar = () => {
    setIsTogglebarVisible((prev) => !prev);
  };

  // Function to close togglebar when clicking outside
  const handleClickOutside = (event) => {
    if (!event.target.closest('.togglebar') && !event.target.closest('img')) {
      setIsTogglebarVisible(false);
    }
  };

  useEffect(() => {
    if (isTogglebarVisible) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isTogglebarVisible]);

  // Scroll functions
  const scrollToTop = () => {
    document.querySelector('.home-main').scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollByHeight = (height) => {
    document.querySelector('.home-main').scrollBy({ top: height, behavior: 'smooth' });
  };

  const handleNavigation = (linkName, callback) => {
    setActiveLink(linkName); // Update active link
    callback(); // Perform the specific navigation or scrolling
    setIsTogglebarVisible(false); // Close the togglebar
  };

  return (
    <nav className="navbar">
      <div className="navbar-title">
        <h1>{nameOfRestaurant || "Name of restaurant"}</h1>
        <p>powered by Ommitus</p>
      </div>
      <img src="/hamburger.svg" onClick={toggleSidebar} alt="Menu" />
      <aside className={`togglebar ${isTogglebarVisible ? 'visible' : ''}`}>
        <ul>
          <li
            className={activeLink === "Home" ? "list-active" : ""}
            onClick={() => handleNavigation("Home", () => {
              navigate(`/customer/restaurant/${nameOfRestaurant}/${idOfRestaurant}/home`);
              setIsTogglebarVisible(false);
              scrollToTop();
            })}
          >
            Home
          </li>
          <li
            className={activeLink === "Menu" ? "list-active" : ""}
            onClick={() => handleNavigation("Menu", () => {
              navigate(`/customer/restaurant/${nameOfRestaurant}/${idOfRestaurant}/menu`);
              setIsTogglebarVisible(false);
            })}
          >
            Menu
          </li>
          <li
            className={activeLink === "Highlights" ? "list-active" : ""}
            onClick={() => handleNavigation("Highlights", () => {
              navigate("/");
              scrollByHeight(window.innerHeight);
              setIsTogglebarVisible(false);
            })}
          >
            Highlights
          </li>
          <li
            className={activeLink === "About" ? "list-active" : ""}
            onClick={() => handleNavigation("About", () => {
              navigate("/");
              scrollByHeight(2 * window.innerHeight);

              setIsTogglebarVisible(false);
            })}
          >
            About
          </li>
        </ul>
      </aside>
    </nav>
  );
};

export default CustomerNavbar;
