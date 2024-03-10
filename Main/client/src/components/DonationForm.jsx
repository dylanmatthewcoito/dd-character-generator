import React from 'react';
// import { loadStripe } from '@stripe/stripe-js';

const DonationForm = ({ handleDonate }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    handleDonate();
  };

  return (
    <div>
      {/* <button onClick={handleDonate}>Donate</button> */}
      <form onSubmit={handleSubmit}>
        <button type="submit">Checkout</button>
      </form>
    </div>
  );
};

export default DonationForm;
