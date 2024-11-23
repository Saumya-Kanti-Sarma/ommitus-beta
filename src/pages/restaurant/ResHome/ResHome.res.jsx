import React from 'react'
import NavbarComponent from '../../../components/Navbar/Navbar.comp'
import { Outlet } from "react-router-dom"
const ResHome = () => {

  return (
    <>
      <NavbarComponent />
      <Outlet />
    </>
  )
}

export default ResHome
