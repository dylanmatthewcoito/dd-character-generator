import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar py-4 fixed-top">
      <div className="container">
        <Link className="navbar-brand" to="/app/prompt">D&D Character Generator</Link>
      </div>
    </nav>
  );
};

export default Navbar;