import React from 'react';
import { Link } from 'react-router-dom';
import DonationForm from './StripePayments';

const Navbar = () => {
  return (
    <nav className="navbar py-4 fixed-top">
      <div className="container">
        <Link className="navbar-brand" to="/app/prompt">D&D Character Generator</Link>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="donate-link" to="/donate">Donate</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;