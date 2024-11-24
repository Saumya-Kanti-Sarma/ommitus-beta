import React from 'react';
import { useParams } from "react-router-dom";

import ProfileCardComponent from '../../../components/profile-card/ProfileCard.comp.jsx';
import ImgGridComponent from '../../../components/ImgGrid/ImgGrid.comp.jsx';

import "./Profile.css";

const RestaurantProfile = () => {
  const { nameOfRestaurant } = useParams()
  return (
    <>
      <head>
        <title>Ommitus | {nameOfRestaurant} </title>
      </head>
      <ProfileCardComponent
        name={nameOfRestaurant}
      />
      <div className="profile-content-area">
        <ImgGridComponent
          heading={"COVER PHOTOS"}
          limit={3}
          props={"coverPics"}
        />

        <ImgGridComponent
          heading={"HIGHLIGHTS"}
          limit={6}
          props={"highlights"}
        />

      </div>
    </>
  )
}


export default RestaurantProfile
