import React, { useEffect, useState } from 'react';
import "./Menu.cus.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import MenuCategory from "./MenuCategory.jsx";

const CustomerMenu = () => {
  const { idOfRestaurant, nameOfRestaurant } = useParams();
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const [filteredMenuData, setFilteredMenuData] = useState([]);
  const [availableCategories, setAvailableCategories] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all-items");
  const [newMenuData, setNewMenuData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [contentLoaading, setContentLoading] = useState("");
  const [loader, setLoader] = useState("none");

  const allCategories = [
    "all-items",
    "starter",
    "main-course",
    "curry",
    "beverages",
    "special",
    "rice",
    "chinese",
    "roti",
    "salad",
    "momos",
    "noodles",
    "birayani",
    "tandoori",
    "drinks",
    "fries",
    "soup",
    "stakes",
    "roast",
    "rolls",
    "cutlets",
  ];

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/restaurant/menu/${idOfRestaurant}&available=true`);
        //console.log(response.data.data);
        setData(response.data.data);
        setNewMenuData(response.data.data);
        setFilteredMenuData(response.data.data); // Initially show all items

        // Filter categories dynamically based on the available items
        const categories = new Set(response.data.data.map((item) => item.category));
        setAvailableCategories(["all-items", ...allCategories.filter((cat) => categories.has(cat))]);
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    }
    fetchData();
  }, [idOfRestaurant]);

  if (data == null) {
    return (
      <>
        <span className='menu-span-container'>
          <section className='cus-menu-section'>
            {Array(8).fill().map((_, index) => (
              <div key={index} className='menu-item-area-animated add-animation'>
                <img src="/food.png" alt="" />
                <span></span>
              </div>
            ))}
          </section>
        </span>
      </>
    );
  }

  // Handle filter button click
  const handleFilterClick = (category) => {
    setActiveFilter(category);
    setLoader("");
    setContentLoading("none");
    if (category === "all-items") {
      //console.log(newMenuData);
      setTotalItems(newMenuData.length);
      setFilteredMenuData(newMenuData); // Show all items
      setTimeout(() => {
        setLoader("none");
        setContentLoading("");
      }, 300);
    } else {
      const filteredData = newMenuData.filter((item) => item.category === category);
      setFilteredMenuData(filteredData);
      setTotalItems(filteredData.length);
      setTimeout(() => {
        setLoader("none");
        setContentLoading("");
      }, 500);
    }
  };

  // Group menu data by category
  const groupedMenuData = filteredMenuData.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});


  return (
    <>
      <section className='cus-menu-section'>
        <div className="filter-dish-section">
          <h3>Filter:</h3>
          {availableCategories.map((category, index) => (
            <button
              key={index}
              className={`cus-filter-dish-section-btns ${activeFilter === category ? "cusactivebtn" : ""}`}
              onClick={() => handleFilterClick(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <hr />
        <br />
        <div className='def-loader' style={{ display: loader }}></div>
        <span style={{ display: contentLoaading }}>
          <h1 className='cus-category-heading'>| {activeFilter} |</h1>
          <p className='cus-category-total'>Total items: {totalItems}</p>
          {Object.keys(groupedMenuData).map((category, index) => (
            <MenuCategory
              key={index}
              title={category}
              items={groupedMenuData[category]}
              navigate={navigate}
              nameOfRestaurant={nameOfRestaurant}
              idOfRestaurant={idOfRestaurant}
            />
          ))}
        </span>
      </section>
    </>
  );
};

export default CustomerMenu;
