import React, { useState } from 'react';
import "./CreateMenu.res.css";
import { useParams } from 'react-router-dom';
import { storage } from '../../../utils/Firebase.js';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import axios from 'axios';
import { toast } from 'react-hot-toast';

const RestaurantCreateMenu = () => {
  const { idOfRestaurant } = useParams();
  const [image, setImage] = useState(null);
  const [loaderDisplay, setLoaderDisplay] = useState("none");

  const [data, setdata] = useState({
    dishName: "",
    image: "",
    price: "",
    available: true,
    category: "",
    veg: false,
    description: "",
    fullPlate: "",
    halfPlate: "",
  });

  const handleSave = async () => {
    const loadingToast = toast.loading("Adding up menu, please wait...");
    try {
      setdata((prevData) => ({ ...prevData, available: true }));
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/restaurant/menu/add-menu/${idOfRestaurant}`, data);
      toast.success("Menu added successfully!");
      setTimeout(() => {
        window.location.reload();
      }, 800);
    } catch (error) {
      toast.error("Failed to add menu.");
      console.log(error);
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  const handleDraft = async () => {
    const loadingToast = toast.loading("Adding up menu, please wait...");
    try {
      setdata((prevData) => ({ ...prevData, available: false }));
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/restaurant/menu/add-menu/${idOfRestaurant}`, data);
      toast.success("Draft saved successfully!");
      setTimeout(() => {
        window.location.reload();
      }, 800);
    } catch (error) {
      toast.error("Failed to save draft.");
      console.log(error);
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  const handleInputChange = (field, value) => {
    setdata({ ...data, [field]: value });
  };

  const handleCategoryChange = (selectedCategory) => {
    setdata({ ...data, category: selectedCategory });
  };

  const handleVegToggle = () => {
    setdata((prevData) => ({ ...prevData, veg: !prevData.veg }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoaderDisplay("block");
      const storageRef = ref(storage, `images/${file.name}`);
      uploadBytes(storageRef, file)
        .then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            setdata((prevData) => ({ ...prevData, image: url }));
            setImage(url);
          });
        })
        .catch((error) => {
          toast.error("Failed to upload image.");
          console.error("Error uploading image:", error);
        })
        .finally(() => {
          setLoaderDisplay("none");
        });
    }
  };

  return (
    <>
      <head>
        <title>
          Create Menu
        </title>
      </head>
      <div className="container">
        <div className="form">

          {/* IMAGE */}
          <div className="image-upload">
            <label htmlFor="imageInput">
              {image ? (
                <img src={image} alt="Dish" className="dish-image" />
              ) : (
                <div className="placeholder">Upload an image of your dish</div>
              )}
            </label>
            <input
              id="imageInput"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ opacity: '0', position: "absolute", background: "red", height: "100%", width: "100%", cursor: "pointer" }}
            />
            <div className='def-loader createMenuLoader' style={{ display: loaderDisplay }}></div>
          </div>

          {/* DISH NAME */}
          <input
            type="text"
            placeholder="Name of dish"
            className='upload-img-input'
            value={data.dishName}
            onChange={(e) => handleInputChange("dishName", e.target.value)}
          />

          {/* CATEGORY */}
          <section className='check-area'>
            <div className="checkbox-group">
              <label>Category:</label>
              {["starter", "main-course", "curry", "beverages", "special"].map((option) => (
                <label key={option}>
                  <input
                    type="radio"
                    name="category"
                    value={option}
                    checked={data.category === option}
                    onChange={() => handleCategoryChange(option)}
                  />
                  {option}
                </label>
              ))}
            </div>

            {/* VEG */}
            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={data.veg}
                  onChange={handleVegToggle}
                />
                Vegetarian
              </label>
            </div>
          </section>

          {/* DESCRIPTION */}
          <textarea
            placeholder="Description of dish"
            className='upload-img-input upload-description'
            value={data.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
          />

          {/* DISH PRICING */}
          <section className='dish-pricing-area'>
            {/* FULL PLATE PRICE */}
            <input
              type="number"
              placeholder="Full plate price in INR"
              className='upload-img-input'
              value={data.fullPlate}
              onChange={(e) => handleInputChange("fullPlate", e.target.value)}
            />

            {/* HALF PLATE PRICE */}
            <input
              type="number"
              placeholder="Half plate price in INR"
              className='upload-img-input'
              value={data.halfPlate}
              onChange={(e) => handleInputChange("halfPlate", e.target.value)}
            />
          </section>



          <div className="buttons">
            <button className="save-button createMenu-btns" onClick={handleSave}>Save</button>
            <button className="draft-button createMenu-btns" onClick={handleDraft}>Draft</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RestaurantCreateMenu;
