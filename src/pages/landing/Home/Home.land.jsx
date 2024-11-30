import React from 'react';
import "./Home.land.css";
import { Link } from "react-router-dom";

const HomeLanding = () => {
  return (
    <>
      <head>
        <title>
          Welcome to Ommitus || The best Restaurant Menu Management App
        </title>
      </head>
      <main className='landing-main'>
        <nav >
          <h1>
            <img src="/logo1.png" className="nav-logo" />
            <Link to={`/`}>Ommitus Menus</Link></h1>
          <ul>
            <button>About</button>
            <button>Contact</button>
            <button>FaQ</button>
            <button>Pricing</button>
            <Link to={`restaurant/create-account`}>Get Started</Link>
          </ul>
        </nav>
        <div className="landing-content-area">
          <section>
            <h1 className='landing-heading'>
              Welcome to <b> Ommitus Menu</b> Management, the best online menu hosting place for your restaurant...
            </h1>
            <p className='landing-sub-heading'>We provide free web hosting for your restaurant and menu. With our Fast Querry and Fast Response APIs, we are able to host your website without any backlogs.</p>

            <div className="landing-btn-area">
              <button className='landing-btn'> Check How it works</button>
            </div>
          </section>
          <aside>
            <img src="/logo3.png" className="aside-logo" />
            <h1>BRING YOUR MENU ONLINE</h1>
          </aside>
        </div>
      </main>
    </>
  )
}

export default HomeLanding
