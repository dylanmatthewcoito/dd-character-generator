import { useState } from 'react';

const DonationForm = ({ handleDonate }) => {
  const [amount, setAmount] = useState('');

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleDonate(amount);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Donation Amount:
        <input type="number" value={amount} onChange={handleAmountChange} />
      </label>
      <button type="submit">Donate</button>
    </form>
  );
};

export default DonationForm;