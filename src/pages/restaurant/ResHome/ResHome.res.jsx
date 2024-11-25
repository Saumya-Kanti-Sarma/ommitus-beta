import React from 'react'
import NavbarComponent from '../../../components/Navbar/Navbar.comp'
import { Outlet } from "react-router-dom";
import "./ResHome.res.css"
const ResHome = () => {

  return (
    <>
      <main id='res-main-area'>
        <section id='nav-area-restaurant'>

          <NavbarComponent />
        </section>

        <section id='outlet-area-restaurant'>
          <Outlet />
        </section>
      </main>
    </>
  )
}

export default ResHome
