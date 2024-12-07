import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "./DishDetail.comp.css";
import { getStorage, ref, deleteObject, uploadBytes, getDownloadURL } from "firebase/storage";

const DishDetailComponent = ({ DisplayEditAndDelete, DisplayAddReview }) => {
  const { idOfRestaurant, dishId, nameOfRestaurant } = useParams();

  const [dish, setDish] = useState(null);
  const [availableStyle, setAvailableStyle] = useState("#4CAF50");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dishPrice, setDishPrice] = useState("");
  const [editingDescription, setEditingDescription] = useState(false);
  const [newDescription, setNewDescription] = useState("");
  const [editingPrice, setEditingPrice] = useState(false);
  const [newHalfPlatePrice, setNewHalfPlatePrice] = useState("");
  const [newFullPlatePrice, setNewFullPlatePrice] = useState("");
  const [editVisible, setEditVisible] = useState("none");
  const navigate = useNavigate();


  // Fetch dish details
  useEffect(() => {
    const fetchDish = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/restaurant/menu/get-one/${idOfRestaurant}/${dishId}`
        );
        setDish(response.data.data);
        setNewDescription(response.data.data.description); // Pre-fill description
        setNewHalfPlatePrice(response.data.data.halfPlate || ""); // Pre-fill half-plate price
        setNewFullPlatePrice(response.data.data.fullPlate || ""); // Pre-fill full-plate price
      } catch (error) {
        setError("Failed to load dish data");
      } finally {
        setLoading(false);
      }
    };
    fetchDish();
  }, [idOfRestaurant, dishId]);

  // Update availability style
  useEffect(() => {
    if (dish?.available === false) {
      setAvailableStyle("#FF4D4D");
    } else {
      setAvailableStyle("#4CAF50");
    }
  }, [dish]);

  // Update dish price display
  useEffect(() => {
    if (dish?.fullPlate?.length > 0 && dish?.halfPlate?.length > 0) {
      setDishPrice(`₹${dish?.fullPlate}/₹${dish?.halfPlate}`);
    } else {
      setDishPrice(`₹${dish?.fullPlate}`);
    }
  }, [dish]);

  // Handle dish deletion
  const handleDeleteDish = async () => {
    const storage = getStorage();
    const imgRef = ref(storage, dish.image);

    toast((t) => (
      <span>
        Dish item will be permanently deleted. Are you sure?
        <br />
        <div className="notification-btn">
          <button
            className="btn edit-btn"
            onClick={async () => {
              try {
                await deleteObject(imgRef);
                toast.promise(
                  axios.delete(
                    `${import.meta.env.VITE_BACKEND_URL}/restaurant/menu/delete-menu/${dishId}`
                  ),
                  {
                    loading: "Deleting...",
                    success: "Dish deleted successfully!",
                    error: "Failed to delete dish",
                    duration: 800,
                  }
                );
                navigate(`/restaurant/${nameOfRestaurant}/${idOfRestaurant}/menu`);
              } catch (error) {
                toast.error("Cannot delete dish. Check console for details.");
                console.error(error);
              }
            }}
          >
            Yes
          </button>
          <button className="btn delete-btn" onClick={() => toast.dismiss(t.id)}>
            No
          </button>
        </div>
      </span>
    ));
  };

  // Handle toggle availability
  const handleToggleAvailability = async () => {
    const toastID = toast.loading("Saving changes...");
    try {
      const updateData = { available: !dish.available };
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/restaurant/menu/edit-menu/${dishId}`,
        updateData
      );
      toast.dismiss(toastID);
      toast.success(response.data.message);
      window.location.reload();
    } catch (error) {
      toast.dismiss(toastID);
      toast.error("Failed to update availability.");
    }
  };

  // Handle image edit
  const handleEditImage = async (event) => {
    const storage = getStorage();
    const newImageFile = event.target.files[0];
    const imgRef = ref(storage, `images/dishes/${dishId}/${newImageFile.name}`);

    try {
      const oldImgRef = ref(storage, dish.image);
      await deleteObject(oldImgRef);

      const uploadTask = await uploadBytes(imgRef, newImageFile);
      const newImageUrl = await getDownloadURL(uploadTask.ref);

      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/restaurant/menu/edit-menu/${dishId}`, {
        image: newImageUrl,
      });

      toast.success("Image updated successfully!");
      window.location.reload();
    } catch (error) {
      toast.error("Failed to update image.");
      console.error(error);
    }
  };

  // Save description changes
  const handleSaveDescription = async () => {
    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/restaurant/menu/edit-menu/${dishId}`, {
        description: newDescription,
      });
      toast.success("Description updated successfully!");
      setEditingDescription(false);
      window.location.reload();
    } catch (error) {
      toast.error("Failed to update description.");
    }
  };

  // Save price changes
  const handleSavePrice = async () => {
    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/restaurant/menu/edit-menu/${dishId}`, {
        halfPlate: newHalfPlatePrice,
        fullPlate: newFullPlatePrice,
      });
      toast.success("Price updated successfully!");
      setEditingPrice(false);
      window.location.reload();
    } catch (error) {
      toast.error("Failed to update price.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="dish-detail-container">
        <div className="dish-image-section"
          onMouseLeave={() => setEditVisible("none")}>
          <img
            src={dish.image || "placeholder-image.jpg"}
            alt={dish.name}
            className="dish-image"
            onMouseEnter={() => setEditVisible("")}
          />
          <span className="image-edit-btn" style={{ display: editVisible }}>
            <input
              type="file"
              className="image-reselect"
              onChange={handleEditImage}
            />
            Edit Image
          </span>
        </div>
        <div className="dish-info-section">
          <h2 className="dish-name">
            {dish.dishName}
            <span className="dish-availability" style={{ color: availableStyle }}>
              | {dish.available ? "Available" : "Not Available"}
            </span>
          </h2>
          <p className="dish-price">{dish.veg == true ? "veg" : "non-veg"}{" "}{dish.category}</p>
          <p className="dish-price">
            Price: {dishPrice}{" "}
            {editingPrice ? (
              <span>
                <input
                  type="number"
                  value={newFullPlatePrice}
                  onChange={(e) => setNewFullPlatePrice(e.target.value)}
                  placeholder="Full Plate Price"
                  className="edit-dish-price-input"
                />
                <input
                  type="number"
                  value={newHalfPlatePrice}
                  onChange={(e) => setNewHalfPlatePrice(e.target.value)}
                  placeholder="Half Plate Price"
                  className="edit-dish-price-input"
                />
                <button onClick={handleSavePrice} className="edited-data-button">Save</button>
              </span>
            ) : (
              <button onClick={() => setEditingPrice(true)} className="edited-data-button">Edit</button>
            )}
          </p>

          <p className="dish-description">
            {editingDescription ? (
              <span>
                <textarea
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="add-new-description"
                />
                <button onClick={handleSaveDescription}>Save</button>
              </span>
            ) : (
              <>
                {dish.description.length > 0 ? dish.description : "add a description"}
                <button onClick={() => setEditingDescription(true)} className="edited-data-button">Edit</button>
              </>
            )}
          </p>

          <div className="dish-actions" style={{ display: DisplayEditAndDelete }}>
            <button className="btn unavailable-btn" onClick={handleToggleAvailability}>
              {dish.available ? "Make Unavailable" : "Make Available"}
            </button>
            <button className="btn delete-btn" onClick={handleDeleteDish}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DishDetailComponent;
