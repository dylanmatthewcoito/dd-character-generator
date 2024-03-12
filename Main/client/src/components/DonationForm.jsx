import React from 'react';

const DonationForm = ({ handleDonate }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    handleDonate();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <button type="submit">Checkout</button>
      </form>
    </div>
  );
};

export default DonationForm;
