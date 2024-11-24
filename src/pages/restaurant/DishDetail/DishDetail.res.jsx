import React from 'react'
import DishDetailComponent from '../../../components/DishDetail/DishDetail.comp'

const RestaurantDishDetail = () => {
  return (
    <>
      <DishDetailComponent
        DisplayEditAndDelete={"default"} DisplayAddReview={"none"}
      />
    </>
  )
}

export default RestaurantDishDetail
