import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
// components
import Button from '../components/Btn/Button.comp.jsx';
import Footer from '../components/Footer/Footer.comp.jsx';
import ImgScroller from '../components/ImgScroller/ImgScroller.comp.jsx';

// css
import './Home.cus.css';

const CustomerHome = () => {
  const [RestaurantData, setRestaurantData] = useState(null);
  const { idOfRestaurant, nameOfRestaurant } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/restaurant/get-info/${idOfRestaurant}`);
        console.log(response.data.restaurantDetails);
        setRestaurantData(response.data.restaurantDetails);
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
      }
    }

    fetchData();
  }, [idOfRestaurant]); // Trigger the effect only when idOfRestaurant changes

  if (!RestaurantData) {
    return (
      <div className="loading-container">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <main className='home-main'>
      <div className="restaurant-info">
        <section className='home-img-display'>
          <ImgScroller RestaurantData={RestaurantData} />
        </section>
        <section className='home-text-display'>
          <h2 id='name-of-restaurant'>{RestaurantData.restaurantName}</h2>
          <p className="owner-name">{RestaurantData.ownerName}</p>
          <p className="opening-date">serving since: {RestaurantData.since}</p>
          <p className="description">
            {RestaurantData.about}
          </p>
        </section>
        <Button
          label="VIEW MENU"
          styles={{
            width: "100%",
            height: "70px"
          }}
          onClick={() => navigate(`/customer/restaurant/${nameOfRestaurant}/${idOfRestaurant}/menu`)}
        />
      </div>
      <div className="highlight-items">
        <h2> |Highlights|</h2>
        {RestaurantData.highlights && RestaurantData.highlights.length > 0 ? (
          RestaurantData.highlights.map((item, index) => (
            <div className="highlight-placeholder" key={index}>
              <img src={item} alt={`Highlight ${index}`} />
            </div>
          ))
        ) : (
          <>
            <div className="highlight-placeholder"></div>
            <div className="highlight-placeholder"></div>
            <div className="highlight-placeholder"></div>
          </>
        )}
        <Button
          label="VISIT OUR MENU"
        />
        <br />
      </div>
      <Footer RestaurantData={RestaurantData} />
    </main>
  );
}

export default CustomerHome;
