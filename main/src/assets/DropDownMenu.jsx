import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './Dropdown.css';
const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown">
    <div className="dropdown-menu-wrapper">
      {isOpen && (
        <div className="dropdown-menu">
          <a href="/News">News</a>
          <a href="/Profile">Profile</a>
        </div>
      )}
      <button className="dropdown-toggle" onClick={toggleDropdown}>
        <FontAwesomeIcon icon={faBars} />
      </button>
    </div>
  </div>
);
};
export default DropdownMenu;