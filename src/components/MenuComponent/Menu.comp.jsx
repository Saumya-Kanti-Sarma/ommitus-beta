import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import "./menu.comp.css";

const MenuComponent = ({ mainUrl, onclickURL }) => {
  const [newMenuData, setNewMenuData] = useState([]);
  const [hoveredItem, setHoveredItem] = useState(null); // State to track hovered item
  const [menuGetDetails, setMenuGetDetails] = useState(null); // State to track hovered item
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}${mainUrl}`
        );

        if (response.status >= 200 && response.status < 300) {
          setNewMenuData(response.data.data);
        }
      } catch (error) {
        console.error(`${import.meta.env.VITE_BACKEND_URL}${mainUrl}`);
        console.error("Error fetching menu data:", error);
        toast.error("Failed to load menu data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  // Toggle dish availability status
  const handleToggleAvailability = async (item) => {
    const toastID = toast.loading("Saving changes...");
    setTimeout(async () => {
      try {
        const updateData = { available: !item.available }; // Toggle availability
        const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/restaurant/menu/edit-menu/${item._id}`, updateData);
        toast.dismiss(toastID);
        toast.success(response.data.message);
        setTimeout(() => window.location.reload(), 400);
      } catch (error) {
        toast.dismiss(toastID);
        toast.error("Failed to update availability.");
      }
    }, 1000);
  };


  return (
    <>
      {loading ? (
        <div className="menu-loader-parent">
          <div className="def-loader menu-loades-main"></div>
        </div>
      ) : (
        <div>
          {newMenuData && newMenuData.length > 0 ? (
            <div className="parent-menu-container">
              <div className="menu-container">
                {newMenuData.map((item) => (
                  <div
                    key={item._id}
                    className="menu-item"
                    onMouseLeave={() => {
                      setHoveredItem(null);
                      setMenuGetDetails(null);
                    }}
                  >

                    <span className="menu-image-span">
                      <img src={item.image || "/food.png"} alt="/food.png"
                        onMouseEnter={() => setMenuGetDetails(item._id)}
                      />
                    </span>
                    <p className="menu-get-details"
                      style={{
                        display: menuGetDetails == item._id ? "" : "none"
                      }}
                      onClick={() => navigate(`${onclickURL}/${item._id}`)}
                    >Get Details</p>
                    <div className="menu-item-content">
                      <div className="menu-item-header">
                        <span onClick={() => navigate(`${onclickURL}/${item._id}`)}>{item.dishName}</span>
                      </div>
                      <p
                        className="menu-item-availability"
                        style={{ color: item.available ? "#4CAF50" : "red" }}
                        onMouseEnter={() => setHoveredItem(item._id)} // Show button when hovering over availability
                      >
                        {item.available ? "Available" : "Un-available"}
                      </p>
                      <button
                        className="menu-edit-availability"
                        style={{
                          backgroundColor: item.available ? "red" : "#4CAF50",
                          display: hoveredItem === item._id ? "block" : "none", // Show button only for hovered item
                        }}
                        onMouseEnter={() => setHoveredItem(item._id)} // Keep button visible when hovering over it
                        onMouseLeave={() => setHoveredItem(null)} // Hide button when leaving it
                        onClick={() => handleToggleAvailability(item)}
                      >
                        make {item.available ? "un-available" : "available"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p>No menu items available.</p>
          )}
        </div>
      )}
    </>
  );
};

export default MenuComponent;
