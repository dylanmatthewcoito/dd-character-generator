import React, { useEffect } from 'react';
import DonationForm from '../components/DonationForm';
import { loadStripe } from '@stripe/stripe-js';

const DonationPage = () => {
  // useEffect(() => {
  //   const initializeStripe = async () => {
  //     try {
  //       const stripe = await loadStripe('pk_live_51OrAfGGM9zTImtWNr7N8cL5DJGaqZEyHuEWIpSoLnuEI8pfM3Kjj4iP0PJsRmqfP1HEKprgyrHKRZqAXlPp0dA3R00Cil2ozx1');
  //       const elements = stripe.elements();
  //       const cardElement = elements.create('card');
  //       cardElement.mount('#card-element');
  //     } catch (error) {
  //       console.error('Error initializing Stripe:', error);
  //     }
  //   };
  //   initializeStripe();
  // }, []);

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