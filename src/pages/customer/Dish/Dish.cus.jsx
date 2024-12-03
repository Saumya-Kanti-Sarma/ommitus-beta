import React, { useEffect, useRef, useState } from 'react';
import "./Dish.cus.css";
import Button from '../Components/Btn/Button.comp.jsx';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import toast from "react-hot-toast"
const CustomerDish = () => {
  const navigate = useNavigate();
  const { idOfRestaurant, dishId } = useParams();
  const [data, setData] = useState(null);

  // Ratings
  const [selectedStar, setSelectedStar] = useState(-1); // Default to -1 (no star selected)
  const [ratingsData, setRatingsData] = useState({
    dishID: "",
    review: "",
    customerName: "",
    stars: 0,
    gender: true, // true for male, false for female
  });

  const nameRef = useRef();
  const reviewRef = useRef();

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/restaurant/menu/get-one/${idOfRestaurant}/${dishId}`);
      setTimeout(() => {
        setData(response.data.data);
        setRatingsData((prev) => ({
          ...prev,
          dishID: response.data.data._id, // Stars are 1-indexed
        }));
      }, 740);
    }
    fetchData();
  }, [idOfRestaurant]);

  const handleStarClick = (index) => {
    setSelectedStar(index);
    setRatingsData((prev) => ({
      ...prev,
      stars: index + 1, // Stars are 1-indexed
    }));
  };

  const handleRef = (e, nextRef) => {
    if (e.key === "Enter") {
      nextRef?.current?.focus();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRatingsData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGenderChange = (gender) => {
    setRatingsData((prev) => ({
      ...prev,
      gender,
    }));
  };

  const handleSubmitRatings = async () => {
    const toastid = toast.loading("adding your review...")
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/review/add-review/${dishId}`, ratingsData);
      console.log(response.data);

      toast.dismiss(toastid);
      toast.success("Thanks for the review..");
      setTimeout(() => {
        window.location.replace();
      }, 350);

    } catch (error) {
      toast.dismiss(toastid)
      toast.error(error.message)
    }
  };

  if (!data) {
    return (
      <main className="cus-dish-main">
        <div className="cus-dish-area-loading">
          <img src="/food.png" alt="Loading" />
          <section className="cus-dishmain-text-section-loading"></section>
        </div>
      </main>
    );
  }

  return (
    <main className="cus-dish-main">
      <div className="cus-dish-main-child">
        <div className="cus-dish-area">
          <img src={data?.image[0] || "/food.png"} id="cus-dishMain-food-img" alt="Dish" />
          <section className="cus-dishmain-text-section">
            <h1>{data?.dishName || "Unavailable"}</h1>
            <p style={{ color: data?.veg ? "green" : "red" }}>
              {data?.veg ? "Veg" : "Non-Veg"} <b>{data?.category}</b>
            </p>
            <br />
            <p>{data?.description || "No description available"}</p>
            <br />
            <p>half-plate: ₹{data?.halfPlate}</p>
            <p>full-plate: ₹{data?.fullPlate}</p>
          </section>
        </div>
        <Button
          label={"Go Back"}
          styles={{ width: "90%", padding: "20px 0", fontSize: "18px", maxWidth: "800px" }}
          onClick={() => navigate(-1)}
        />

        <h1>Give a review</h1>
        <div className="review-stars">
          {[...Array(5)].map((_, index) => (
            <span
              key={index}
              className="review-stars"
              onClick={() => handleStarClick(index)}
              style={{
                filter: `grayscale(${index <= selectedStar ? 0 : 100}%)`,
              }}
            >
              ★
            </span>
          ))}
        </div>
        <input
          type="text"
          placeholder="Your name Alex?"
          id="reviewer-name"
          ref={nameRef}
          name="customerName"
          onChange={handleChange}
          onKeyDown={(e) => handleRef(e, reviewRef)}
        />
        <textarea
          className="give-review"
          placeholder="Please share us your experience with the dish..."
          ref={reviewRef}
          name="review"
          onChange={handleChange}
          onKeyDown={(e) => handleRef(e, nameRef)}
        ></textarea>
        <p>
          Gender: <input
            type="radio"
            id="male-tick-btn"
            name="gender"
            value="true"
            onChange={() => handleGenderChange(true)}
            checked={ratingsData.gender === true}
          />
          <label htmlFor="male-tick-btn">Male</label>

          <input
            type="radio"
            id="female-tick-btn"
            name="gender"
            value="false"
            onChange={() => handleGenderChange(false)}
            checked={ratingsData.gender === false}
          />
          <label htmlFor="female-tick-btn">Female</label>
        </p>

        <Button
          label={"Submit"}
          styles={{ width: "40%", padding: "20px 0", fontSize: "18px", maxWidth: "800px", backgroundColor: "#02ce46" }}
          onClick={handleSubmitRatings}
        />
        <div className="all-reviews-arre"></div>
      </div>
    </main>
  );
};




export default CustomerDish;
