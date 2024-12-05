import React, { useState } from 'react';
import './Menu.module.scss';
import { Link } from "react-router-dom";

function Menu({ onLogout }) {
  const [isHovered, setIsHovered] = useState(false);

  // Base style for the logout button
  const logoutButtonStyle = {
    backgroundColor: 'transparent',
    color: 'white',
    border: '1px solid white',
    borderRadius: '4px',
    padding: '2px 3px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s, color 0.3s',
  };

  // Hover style for the logout button
  const logoutButtonHoverStyle = {
    backgroundColor: 'white',
    color: '#007bff', // Change color on hover
  };

  // Combine base style with hover style if the button is hovered
  const combinedButtonStyle = isHovered
    ? { ...logoutButtonStyle, ...logoutButtonHoverStyle }
    : logoutButtonStyle;

  return (
    <div>
      <nav
        role="navigation"
        aria-label="Main menu"
        itemScope
        itemType="https://schema.org/SiteNavigationElement"
      >
        <ul>
          <li>
            <Link
              itemProp="url"
              to="/dashboard"
              tabIndex="0" // Ensure the link is keyboard-accessible
              aria-label="Go to Dashboard"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              itemProp="url"
              to="/summary"
              tabIndex="0" // Ensure the link is keyboard-accessible
              aria-label="Go to Summary"
            >
              Summary
            </Link>
          </li>
          <li>
            <Link
              itemProp="url"
              to="/report"
              tabIndex="0" // Ensure the link is keyboard-accessible
              aria-label="Go to Report"
            >
              Report
            </Link>
          </li>
          <li>
            <button
              style={combinedButtonStyle}
              onClick={onLogout}
              aria-label="Logout"
              tabIndex="0" // Ensure the button is keyboard-accessible
              onMouseEnter={() => setIsHovered(true)} // Set hover to true on mouse enter
              onMouseLeave={() => setIsHovered(false)} // Set hover to false on mouse leave
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Menu;
