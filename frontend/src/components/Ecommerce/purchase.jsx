import React, { useState, useEffect } from 'react';

const PurchaseProduct = () => {
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [merchandiseList, setMerchandiseList] = useState([]);
  const [userDetails, setUserDetails] = useState(JSON.parse(localStorage.getItem('userDetails')));

  useEffect(() => {
    fetchAllProducts();
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

  const handleBuyProduct = async () => {
    try {
      // Check if user is logged in
      if (!localStorage.getItem('isLoggedIn')) {
        setError('Please log in to buy a product.');
        setMessage('');
        return;
      }

      const response = await fetch('http://localhost:3005/api/ecommerce/buymerch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userDetails?.id,
          id: productId,
          quantity: parseInt(quantity),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(`Product bought successfully! Order ID: ${data.id}`);
        setError('');
        // Fetch updated product list after a successful purchase
        fetchAllProducts();
      } else {
        const data = await response.json();
        setError(`Error buying product: ${data.error}`);
        setMessage('');
      }
    } catch (error) {
      console.error('Error buying product:', error);
      setError('Failed to buy the product. Please try again.');
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

      <label>Product ID:</label>
      <input type="text" value={productId} onChange={(e) => setProductId(e.target.value)} />

      <label>Quantity:</label>
      <input type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} />

      <button onClick={handleBuyProduct}>Buy Product</button>

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

export default PurchaseProduct;
