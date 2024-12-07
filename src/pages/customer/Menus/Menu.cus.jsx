import React, { useEffect, useState } from 'react';
import "./Menu.cus.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const CustomerMenu = () => {
  const [data, setData] = useState(null);
  const { idOfRestaurant, nameOfRestaurant } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/restaurant/menu/all-items/${idOfRestaurant}`);
        //console.log(response.data.data);
        setTimeout(() => {
          setData(response.data.data);
        }, 800);
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    }
    fetchData();
  }, [idOfRestaurant]);

  if (!data) {
    return (
      <>

        <span className='menu-span-container' >
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
    )
  }

  return (
    <>
      <section className='cus-menu-section'>
        {
          <>

            {/* Render the menu items */}

            <p className='category-tag'>{data.starter?.length > 0 ? "|STARTER|" : ""}</p>
            {data.starter?.map((menuItem, index) => (
              <span key={index} className='menu-span-container'>
                <div className='menu-item-area' onClick={() => {
                  navigate(`/customer/restaurant/${nameOfRestaurant}/${idOfRestaurant}/${menuItem._id}`)
                }}>
                  <img
                    src={menuItem.image || "/food.png"}
                    alt={menuItem.dishName || "Dish Image"}
                    className="menu-item-image"
                  />
                  <span>
                    <div className="cus-dish-name">
                      <h4>{menuItem.dishName || "Dish Name"}</h4>
                      <p style={{ color: menuItem.veg ? "green" : "black" }}>{menuItem.veg ? "Veg" : "Non-Veg"}</p>
                    </div>
                    <p className='cus-dish-descp'>
                      {menuItem.description
                        ? menuItem.description.split(' ').length > 10
                          ? menuItem.description.split(' ').slice(0, 10).join(' ') + '...'
                          : menuItem.description
                        : ""}
                    </p>

                    <p className='cus-dish-price'>Price: ₹{menuItem.fullPlate && menuItem.halfPlate ? `₹${menuItem.fullPlate}/₹${menuItem.halfPlate}` : `₹${menuItem.fullPlate}`}</p>

                  </span>
                </div>
              </span>
            ))}
            <br />
            <p className='category-tag'>{data.mainCourse?.length > 0 ? "|MAIN COURSE|" : ""}</p>
            {data.mainCourse?.map((menuItem, index) => (
              <span key={index} className='menu-span-container'>
                <p>{menuItem.title}</p>
                <div className='menu-item-area' onClick={() => {
                  navigate(`/customer/restaurant/${nameOfRestaurant}/${idOfRestaurant}/${menuItem._id}`)
                }}>
                  <img
                    src={menuItem.image || "/food.png"}
                    alt={menuItem.dishName || "Dish Image"}
                    className="menu-item-image"
                  />
                  <span>
                    <div className="cus-dish-name">
                      <h4>{menuItem.dishName || "Dish Name"}</h4>
                      <p style={{ color: menuItem.veg ? "green" : "black" }}>{menuItem.veg ? "Veg" : "Non-Veg"}</p>
                    </div>
                    <p className='cus-dish-descp'>
                      {menuItem.description
                        ? menuItem.description.split(' ').length > 10
                          ? menuItem.description.split(' ').slice(0, 10).join(' ') + '...'
                          : menuItem.description
                        : ""}
                    </p>

                    <p className='cus-dish-price'>Price: ₹{menuItem.fullPlate || "N/A"}</p>

                  </span>
                </div>
              </span>
            ))}
            <br />

            <p className='category-tag'>{data.curry?.length > 0 ? "| CURRY |" : ""}</p>
            {data.curry?.map((menuItem, index) => (
              <span key={index} className='menu-span-container'>
                <p>{menuItem.title}</p>
                <div className='menu-item-area' onClick={() => {
                  navigate(`/customer/restaurant/${nameOfRestaurant}/${idOfRestaurant}/${menuItem._id}`)
                }}>
                  <img
                    src={menuItem.image || "/food.png"}
                    alt={menuItem.dishName || "Dish Image"}
                    className="menu-item-image"
                  />
                  <span>
                    <div className="cus-dish-name">
                      <h4>{menuItem.dishName || "Dish Name"}</h4>
                      <p style={{ color: menuItem.veg ? "green" : "black" }}>{menuItem.veg ? "Veg" : "Non-Veg"}</p>
                    </div>
                    <p className='cus-dish-descp'>
                      {menuItem.description
                        ? menuItem.description.split(' ').length > 10
                          ? menuItem.description.split(' ').slice(0, 10).join(' ') + '...'
                          : menuItem.description
                        : ""}
                    </p>

                    <p className='cus-dish-price'>Price: ₹{menuItem.fullPlate || "N/A"}</p>

                  </span>
                </div>
              </span>
            ))}

            <br />
            <p className='category-tag'>{data.rice?.length > 0 ? "| rice |" : ""}</p>
            {data.rice?.map((menuItem, index) => (
              <span key={index} className='menu-span-container'>
                <p>{menuItem.title}</p>
                <div className='menu-item-area' onClick={() => {
                  navigate(`/customer/restaurant/${nameOfRestaurant}/${idOfRestaurant}/${menuItem._id}`)
                }}>
                  <img
                    src={menuItem.image || "/food.png"}
                    alt={menuItem.dishName || "Dish Image"}
                    className="menu-item-image"
                  />
                  <span>
                    <div className="cus-dish-name">
                      <h4>{menuItem.dishName || "Dish Name"}</h4>
                      <p style={{ color: menuItem.veg ? "green" : "black" }}>{menuItem.veg ? "Veg" : "Non-Veg"}</p>
                    </div>
                    <p className='cus-dish-descp'>
                      {menuItem.description
                        ? menuItem.description.split(' ').length > 10
                          ? menuItem.description.split(' ').slice(0, 10).join(' ') + '...'
                          : menuItem.description
                        : ""}
                    </p>

                    <p className='cus-dish-price'>Price: ₹{menuItem.fullPlate || "N/A"}</p>

                  </span>
                </div>
              </span>
            ))}
            <br />


            <p className='category-tag'>{data.chinese?.length > 0 ? "| chinese |" : ""}</p>
            {data.chinese?.map((menuItem, index) => (
              <span key={index} className='menu-span-container'>
                <p>{menuItem.title}</p>
                <div className='menu-item-area' onClick={() => {
                  navigate(`/customer/restaurant/${nameOfRestaurant}/${idOfRestaurant}/${menuItem._id}`)
                }}>
                  <img
                    src={menuItem.image || "/food.png"}
                    alt={menuItem.dishName || "Dish Image"}
                    className="menu-item-image"
                  />
                  <span>
                    <div className="cus-dish-name">
                      <h4>{menuItem.dishName || "Dish Name"}</h4>
                      <p style={{ color: menuItem.veg ? "green" : "black" }}>{menuItem.veg ? "Veg" : "Non-Veg"}</p>
                    </div>
                    <p className='cus-dish-descp'>
                      {menuItem.description
                        ? menuItem.description.split(' ').length > 10
                          ? menuItem.description.split(' ').slice(0, 10).join(' ') + '...'
                          : menuItem.description
                        : ""}
                    </p>

                    <p className='cus-dish-price'>Price: ₹{menuItem.fullPlate || "N/A"}</p>

                  </span>
                </div>
              </span>
            ))}
            <br />
            <p className='category-tag'>{data.roti?.length > 0 ? "| roti |" : ""}</p>
            {data.roti?.map((menuItem, index) => (
              <span key={index} className='menu-span-container'>
                <p>{menuItem.title}</p>
                <div className='menu-item-area' onClick={() => {
                  navigate(`/customer/restaurant/${nameOfRestaurant}/${idOfRestaurant}/${menuItem._id}`)
                }}>
                  <img
                    src={menuItem.image || "/food.png"}
                    alt={menuItem.dishName || "Dish Image"}
                    className="menu-item-image"
                  />
                  <span>
                    <div className="cus-dish-name">
                      <h4>{menuItem.dishName || "Dish Name"}</h4>
                      <p style={{ color: menuItem.veg ? "green" : "black" }}>{menuItem.veg ? "Veg" : "Non-Veg"}</p>
                    </div>
                    <p className='cus-dish-descp'>
                      {menuItem.description
                        ? menuItem.description.split(' ').length > 10
                          ? menuItem.description.split(' ').slice(0, 10).join(' ') + '...'
                          : menuItem.description
                        : ""}
                    </p>

                    <p className='cus-dish-price'>Price: ₹{menuItem.fullPlate || "N/A"}</p>

                  </span>
                </div>
              </span>
            ))}
            <br />

            <p className='category-tag'>{data.beverages?.length > 0 ? "| BEVERAGES |" : ""}</p>
            {data.beverages?.map((menuItem, index) => (
              <span key={index} className='menu-span-container'>
                <p>{menuItem.title}</p>
                <div className='menu-item-area' onClick={() => {
                  navigate(`/customer/restaurant/${nameOfRestaurant}/${idOfRestaurant}/${menuItem._id}`)
                }}>
                  <img
                    src={menuItem.image || "/food.png"}
                    alt={menuItem.dishName || "Dish Image"}
                    className="menu-item-image"
                  />
                  <span>
                    <div className="cus-dish-name">
                      <h4>{menuItem.dishName || "Dish Name"}</h4>
                      <p style={{ color: menuItem.veg ? "green" : "black" }}>{menuItem.veg ? "Veg" : "Non-Veg"}</p>
                    </div>
                    <p className='cus-dish-descp'>
                      {menuItem.description
                        ? menuItem.description.split(' ').length > 10
                          ? menuItem.description.split(' ').slice(0, 10).join(' ') + '...'
                          : menuItem.description
                        : ""}
                    </p>

                    <p className='cus-dish-price'>Price: ₹{menuItem.fullPlate || "N/A"}</p>

                  </span>
                </div>
              </span>
            ))}
            <br />

            <p className='category-tag'>  {data.special?.length > 0 ? "| SPECIAL |" : ""}</p>
            {data.special?.map((menuItem, index) => (
              <span key={index} className='menu-span-container'>
                <p>{menuItem.title}</p>
                <div className='menu-item-area' onClick={() => {
                  navigate(`/customer/restaurant/${nameOfRestaurant}/${idOfRestaurant}/${menuItem._id}`)
                }}>
                  <img
                    src={menuItem.image || "/food.png"}
                    alt={menuItem.dishName || "Dish Image"}
                    className="menu-item-image"
                  />
                  <span>
                    <div className="cus-dish-name">
                      <h4>{menuItem.dishName || "Dish Name"}</h4>
                      <p style={{ color: menuItem.veg ? "green" : "black" }}>{menuItem.veg ? "Veg" : "Non-Veg"}</p>
                    </div>
                    <p className='cus-dish-descp'>
                      {menuItem.description
                        ? menuItem.description.split(' ').length > 10
                          ? menuItem.description.split(' ').slice(0, 10).join(' ') + '...'
                          : menuItem.description
                        : ""}
                    </p>

                    <p className='cus-dish-price'>Price: ₹{menuItem.fullPlate || "N/A"}</p>

                  </span>
                </div>
                <br />
                <br />
              </span>
            ))}
            <h1 className='cus-menu-heading' style={{ opacity: "0.6" }}>{"| Opps! \n Our Dish Ends (>_<!) |"}</h1>
            <br />
            <br />
          </>
        }
      </section>
    </>
  );
};

export default CustomerMenu;
