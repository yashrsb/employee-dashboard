import React from 'react';
import './Menu.css';

function Menu() {
  return (
    <div className="menu-bar">
      <div className="horizontal-menu">
        <a href="#">Home</a>
        <a href="#">About</a>
        <div className="submenu">
          <a href="#">Services</a>
          <div className="submenu-items">
            <a href="#">Web</a>
            <a href="#">Mobile</a>
          </div>
        </div>
        <a href="#">Contact</a>
      </div>
    </div>
  );
}

export default Menu;
