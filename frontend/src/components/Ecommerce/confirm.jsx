import React, { useState } from 'react';

const ConfirmOrder = () => {
  const [orderID, setOrderId] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleConfirmOrder = async () => {
    try {
      const response = await fetch('http://localhost:3005/api/ecommerce/confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderID,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(`Order confirmed successfully! OrderID: ${orderID}`);
        setError('');
      } else {
        const data = await response.json();
        setError(`Error confirming order: ${data.error}`);
        setMessage('');
      }
    } catch (error) {
      console.error('Error confirming order:', error);
      setError('Failed to confirm order. Please try again.');
      setMessage('');
    }
  };

  return (
    <div>
      <h2>Confirm Order</h2>
      <label>Order ID:</label>
      <input type="text" value={orderID} onChange={(e) => setOrderId(e.target.value)} />

      <button onClick={handleConfirmOrder}>Confirm Order</button>

      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ConfirmOrder;
