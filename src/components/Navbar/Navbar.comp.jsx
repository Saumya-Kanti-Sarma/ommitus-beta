import React, { useState } from 'react';
import "./Navbar.comp.css";
const NavbarComponent = ({
  restaurantName
}) => {
  const [activate0, setactivate0] = useState("");
  const [activate1, setactivate1] = useState("");
  const [activate2, setactivate2] = useState("");
  const [activate3, setactivate3] = useState("");
  const [activate4, setactivate4] = useState("");

  return (
    <>
      <nav className='nav-componets'>
        <section className='nav-elements nav-name'>
          <h1>
            {restaurantName || "Name Of Restaurant"}
          </h1>
        </section>
        <section className='nav-elements nav-link-section'>
          <li className={`navlinks ${activate0}`}
            onClick={() => {
              activate0 == "active-link" ? setactivate0("active-link") : setactivate0("");
              setactivate1("");
              setactivate2("");
              setactivate3("");
              setactivate4("");
            }}
          >
            HOME</li>
          <li className={`navlinks ${activate1}`}
            onClick={() => {
              activate1 == "active-link" ? setactivate1("active-link") : setactivate1("");
              setactivate0("");
              setactivate2("");
              setactivate3("");
              setactivate4("");
            }}
          >
            CREATE MENU</li>
          <li className={`navlinks ${activate2}`}
            onClick={() => {
              activate2 == "active-link" ? setactivate2("active-link") : setactivate2("");
              setactivate1("");
              setactivate0("");
              setactivate3("");
              setactivate4("");
            }}
          >
            AVAILABLE</li>
          <li className={`navlinks ${activate3}`}
            onClick={() => {
              activate3 == "active-link" ? setactivate3("active-link") : setactivate3("");
              setactivate1("");
              setactivate2("");
              setactivate0("");
              setactivate4("");
            }}
          >
            UN-AVAILABLE</li>
          <li className={`navlinks ${activate4}`}
            onClick={() => {
              activate4 == "active-link" ? setactivate4("active-link") : setactivate4("");
              setactivate1("");
              setactivate2("");
              setactivate3("");
              setactivate0("");
            }}
          >
            QR-CODE</li>
        </section>
      </nav>
    </>
  )
}

export default NavbarComponent
