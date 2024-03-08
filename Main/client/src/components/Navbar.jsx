import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Auth from '../utils/auth';

const Navbar = () => {
  const location = useLocation(); // Use the useLocation hook to access the current path

  const handleLogout = () => {
    Auth.logout();
  }
  //  Auth.logout();
  // Determine if the current page is the AuthPage by checking the location.pathname
  // Adjust the condition based on your AuthPage's route
  const isAuthPage = location.pathname === '/' || location.pathname.startsWith('/login') || location.pathname.startsWith('/signup');
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
  <div>
    {!isAuthPage && ( // Only render the navigation links if NOT on the AuthPage
    <nav className="navbar py-4 fixed-top">
      <div className="container">
        <div className="logo red">D&D Character Generator</div>
          <ul className="navbar-nav ml-auto">
            <li className="">
              <Link className="home red-link" to="/app/prompt">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="donate-link red-link" to="/app/donate">Donate</Link>
            </li>
            <li className="nav-item">
              <Link className="profile red-link" to="/app/profile">Characters</Link>
            </li>
            <li className="nav-item">
              <Link className="log-out red-link" to="/" onClick={handleLogout}>Log Out</Link>
            </li>
          </ul>
      </div>
    </nav>
    )}
  </div>
  );
};

export default Navbar;