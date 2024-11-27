import React from 'react';
import './Footer.comp.css';

const Footer = ({ RestaurantData }) => {
  return (
    <footer className="footer">
      <section>
        <h3>Visit Us Again</h3>
        <p>{RestaurantData.restaurantName}</p>

        <div className="footer-info">
          <br />
          <p>
            <strong>Address:</strong>
          </p>
          <p>{RestaurantData.address}</p>
          <br />
          <p><strong>Contact:</strong></p>
          <p>{RestaurantData.phoneNumber}</p>
          <p>{RestaurantData.email}</p>
          <br />
          <p>Propt. of: {RestaurantData.ownerName}</p>
          <p>Estd: {RestaurantData.since}</p>
          <p>Joined Ommitus at: {RestaurantData.created}</p>
        </div>
        <br />
      </section>
      <div className="footer-branding">Another Restaurant Branded by Ommitus.com</div>
    </footer>
  );
};

export default Footer;
