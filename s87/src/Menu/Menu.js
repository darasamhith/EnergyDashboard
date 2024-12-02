import React from 'react';
import './Menu.module.scss'
import { Link } from "react-router-dom";

function Menu({onLogout}) {

  return (
    <div>
      <nav
        role="navigation"
        aria-label="Main menu"
        itemScope
        itemType="https://schema.org/SiteNavigationElement"
      >
        <ul>
          <li><Link itemProp="url" to="/dashboard">Dashboard</Link></li>
          <li><Link itemProp="url" to="/summary">Summary</Link></li>
          <li><Link itemProp="url" to="/report">Report</Link></li>
          <li><button className = "logout-button" onClick={onLogout}>Logout</button></li>
        </ul>
      </nav>
    </div>
  );
}

export default Menu;
