import React, { useEffect, useState } from 'react';
import "./Dish.cus.css";
import Button from '../Components/Btn/Button.comp.jsx';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
const CustomerDish = () => {
  const navigate = useNavigate();
  const { idOfRestaurant, dishId } = useParams();
  const [data, setData] = useState(null);
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/restaurant/menu/get-one/${idOfRestaurant}/${dishId}`);
      console.log(response.data.data);
      setTimeout(() => {
        setData(response.data.data);
      }, 740);
    }
    fetchData();
  }, [idOfRestaurant, dishId]);
  if (!data) {
    return (
      <>
        <main className='cus-dish-main'>
          <div className="cus-dish-area-loading">
            <img src="/food.png" />
            <section className='cus-dishmain-text-section-loading'>

            </section>
          </div>
        </main>
      </>
    )
  }
  return (
    <>
      <main className='cus-dish-main'>
        <div className="cus-dish-area">
          <img src={data?.image[0] || "/food.png"} id='cus-dishMain-food-img' />
          <section className='cus-dishmain-text-section'>
            <h1>{data?.dishName || "Unavailable"}</h1>
            <p style={{ color: data?.veg ? "green" : "red" }}>{data?.veg ? "Veg" : "Non-Veg"}</p>

            <p>{data?.description || "No description available"}</p>
            <br />
            <p>half-plate: ₹{data?.halfPlate}</p>
            <p>full-plate: ₹{data?.fullPlate}</p>
          </section>
        </div>
        <Button label={"Go Back"} styles={{ width: "90%", padding: "20px 0", fontSize: "18px", maxWidth: "800px" }} onClick={() => navigate(-1)} />
      </main>
    </>
  )
}

export default CustomerDish
