import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light py-4">
      <div className="container">
        <Link className="navbar-brand" to="/">D&D Character Generator</Link>
      </div>
    </nav>
  );
};

export default Navbar;