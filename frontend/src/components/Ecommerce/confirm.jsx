import React, { useState, useEffect } from 'react';

const ConfirmOrder = () => {
  const [orderID, setOrderId] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [userDetails, setUserDetails] = useState(JSON.parse(localStorage.getItem('userDetails')));
  const [merchandiseList, setMerchandiseList] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem('isLoggedIn')) {
      setError('Please log in to confirm an order.');
    } else {
      fetchProductsAndSetState();
    }    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    try {
      const response = await fetch('http://localhost:3005/api/ecommerce/products');
      if (response.ok) {
        const products = await response.json();
        setMerchandiseList(products);
        setError('');
      } else {
        throw new Error('Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to fetch products. Please try again later.');
    }
  };

  const fetchProductsAndSetState = async () => {
    try {
      const products = await fetchProducts();
      setMerchandiseList(products);
      setError('');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleConfirmOrder = async () => {
    try {
      // Check if the user is logged in
      if (!localStorage.getItem('isLoggedIn')) {
        setError('Please log in to confirm an order.');
        setMessage('');
        return;
      }

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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          {userDetails && (
            <p style={{ fontSize: '1.5em', fontWeight: 'bold' }}>
              Welcome, {userDetails.firstname} {userDetails.lastname}<br></br>
            </p>
          )}
        </div>
      </div>

      <h2>Confirm Order</h2>
      <label>Order ID:</label>
      <input type="text" value={orderID} onChange={(e) => setOrderId(e.target.value)} />

      <button onClick={handleConfirmOrder}>Confirm Order</button>

      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h2>All Products</h2>
      <ul>
        {merchandiseList.map((product) => (
          <li key={product.id}>
            <p>ID: {product.id}</p>
            <p>Name: {product.merchName}</p>
            <p>Type: {product.merchType}</p>
            <p>Cost: {product.merchCost}</p>
            <p>Quantity: {product.merchQty}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConfirmOrder;
