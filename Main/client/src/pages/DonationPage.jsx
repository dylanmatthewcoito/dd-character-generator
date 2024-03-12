import React from 'react';
import DonationForm from '../components/DonationForm';

const DonationPage = () => {
  const handleDonate = async (amount) => {
    try {
      // Make a request to backend server to create a payment intent with the specified amount
      const response = await fetch('/api/checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      });

      if (response.ok) {
        const data = await response.json();
        location.href = data;
        // Handle the successful response from the server
        console.log('Payment intent created successfully:', data);
      } else {
        // Handle errors from the server
        console.error('Failed to create payment intent');
      }
    } catch (error) {
      console.error('Error processing donation:', error);
    }
  };

  return (
    <div>
      <h1>Donate</h1>
      <DonationForm handleDonate={handleDonate} />
    </div>
  );
};
export default DonationPage;