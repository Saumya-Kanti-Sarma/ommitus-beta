import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// ALL RESTAURANT COMPONENTS
import RestaurantCreateAccount from './pages/restaurant/CreateAccount/CreateAccount.res.jsx';
import RestaurantLoginAccount from './pages/restaurant/LoginAccount/LoginAccount.res.jsx';
import ResHome from './pages/restaurant/ResHome/ResHome.res.jsx';
import RestaurantCreateMenu from './pages/restaurant/CreateMenu/CreateMenu.res.jsx';
import Available from './pages/restaurant/Available/Availabe.res.jsx';
import RestaurantDishDetail from './pages/restaurant/DishDetail/DishDetail.res.jsx';
import Unavailable from './pages/restaurant/Unavailable/Unavailable.res.jsx';
import RestaurantQR from './pages/restaurant/QR/Qr.res.jsx';

// ALL CUSTOMER COMPONENTS
import CustomerHome from './pages/customer/Home/Home.cus.jsx';
import CustomerMenu from './pages/customer/Menus/Menu.cus.jsx';
import CustomerDish from './pages/customer/Dish/Dish.cus.jsx';
import CustomerCart from './pages/customer/Cart/Cart.cus.jsx';

//ALL LANDING PAGE COMPONENTS
import HomeLanding from './pages/landing/Home/Home.land.jsx';
import AboutLanding from './pages/landing/About/About.land.jsx';
import PricingLanding from './pages/landing/Pricing/Pricing.land.jsx';
import ContactLanding from './pages/landing/Contact/Contact.land.jsx';
import HelpLanding from './pages/landing/Help/Help.land.jsx';


const App = () => {
  return (
    <>
      <Router>
        <Routes>
          {/* Restaurant routes */}

          <Route path='/restaurant/create-account' element={<RestaurantCreateAccount />} />
          <Route path='/restaurant/login-account' element={<RestaurantLoginAccount />} />
          <Route path='/restaurant/:name/:id'>
            <Route path='home' element={<ResHome />} />
            <Route path='create-menu' element={<RestaurantCreateMenu />} />
            <Route path='available' element={<Available />} />
            <Route path='available/:dishId' element={<RestaurantDishDetail />} />
            <Route path='un-availables' element={<Unavailable />} />
            <Route path='qr-code' element={<RestaurantQR />} />
          </Route>

          {/* Customer routes */}
          <Route path='/customer/restaurant/:name'>
            <Route path='home' element={<CustomerHome />} />
            <Route path='menus' element={<CustomerMenu />} />
            <Route path='menus/:dishId' element={<CustomerDish />} />
            <Route path='menus/cart' element={<CustomerCart />} />
          </Route >

          {/* Landing page */}
          <Route path='/' element={<HomeLanding />} />
          <Route path='/about' element={<AboutLanding />} />
          <Route path='/pricing' element={<PricingLanding />} />
          <Route path='/contact' element={<ContactLanding />} />
          <Route path='/help' element={<HelpLanding />} />
        </Routes>
      </Router>
    </>

  )
}

export default App
