import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar py-4 fixed-top">
      <div className="container">
        <div className="logo red">D&D Character Generator</div>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="home red-link" to="app/prompt">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="donate-link red-link" to="app/donate">Donate</Link>
          </li>
          <li className="nav-item">
            <Link className="profile red-link" to="app/profile">Profile</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;