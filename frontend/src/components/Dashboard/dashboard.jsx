import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [buyerId, setBuyerId] = useState('');
  const [sellerId, setSellerId] = useState('');
  const [amount, setAmount] = useState('');
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [userDetails, setUserDetails] = useState(JSON.parse(localStorage.getItem('userDetails')));

  const handleRecordPurchase = async () => {
    try {
      if (!localStorage.getItem('isLoggedIn')) {
        setError('Please log in first to proceed with the dashboard.');
        return;
      }

      setLoading(true);

      if (!buyerId || !sellerId || !amount || isNaN(buyerId) || isNaN(sellerId) || isNaN(amount)) {
        setError('Please enter valid values for Buyer ID, Seller ID, and Amount.');
        return;
      }

      const response = await axios.post('http://localhost:3005/api/dashboard/recordpurchase', {
        buyerId: parseInt(buyerId),
        sellerId: parseInt(sellerId),
        amount: parseFloat(amount),
      });

      setResponse(response.data);
    } catch (error) {
      console.error('Error recording purchase:', error);
      setResponse({ error: 'Failed to record purchase.' });
    } finally {
      setLoading(false);
    }
  };

  const handleGetUserEarnings = async () => {
    try {
      const response = await axios.get(`http://localhost:3005/api/dashboard/earnings/${userId}`);
      setResponse(response.data);
    } catch (error) {
      console.error('Error retrieving earnings:', error);
      setResponse({ error: 'Failed to retrieve earnings.' });
    }
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (!isLoggedIn) {
      setError('Please log in first to proceed with the dashboard.');
    }
  }, []);

  return (
    <div>
      <h1>Welcome: {userDetails?.firstname} {userDetails?.lastname}</h1>

      <div>
        <h2>Record Purchase</h2>
        <label>
          Buyer ID:
          <input type="text" value={buyerId} onChange={(e) => setBuyerId(e.target.value)} />
        </label>
        <label>
          Seller ID:
          <input type="text" value={sellerId} onChange={(e) => setSellerId(e.target.value)} />
        </label>
        <label>
          Amount:
          <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </label>
        <button onClick={handleRecordPurchase} disabled={loading}>
          {loading ? 'Recording...' : 'Record Purchase'}
        </button>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        {response && (
          <div>
            {response.error ? (
              <p style={{ color: 'red' }}>{response.error}</p>
            ) : (
              <p>Purchase recorded successfully!</p>
            )}
          </div>
        )}
      </div>

      <div>
        <h2>Get User Earnings</h2>
        <label>
          User ID:
          <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
        </label>
        <button onClick={handleGetUserEarnings}>Get Earnings</button>
      </div>

      {response && (
        <div>
          <h2>Response</h2>
          {response.error ? (
            <p style={{ color: 'red' }}>{response.error}</p>
          ) : (
            <pre>{JSON.stringify(response, null, 2)}</pre>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
