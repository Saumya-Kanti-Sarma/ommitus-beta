import React from 'react';
import "./Navbar.comp.css";
const NavbarComponent = ({
  restaurantName
}) => {
  return (
    <>
      <nav className='nav-componets'>
        <section className='nav-elements nav-name'>
          <h1>
            {restaurantName || "Name Of Restaurant"}
          </h1>
        </section>
        <section className='nav-elements nav-link-section'>
          <li className='navlinks'>HOME</li>
          <li className='navlinks'>CREATE MENU</li>
          <li className='navlinks'>AVAILABLE</li>
          <li className='navlinks'>UN-AVAILABLE</li>
          <li className='navlinks'>QR-CODE</li>
        </section>
      </nav>
    </>
  )
}

export default NavbarComponent
