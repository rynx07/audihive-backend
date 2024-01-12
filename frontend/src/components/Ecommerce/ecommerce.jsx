import React, { useState, useEffect } from 'react';

const MerchManagement = () => {
  const [merchandiseList, setMerchandiseList] = useState([]);
  const [formData, setFormData] = useState({
    merchName: '',
    merchType: '',
    merchCost: '',
    merchQty: '',
    profileId: '', // Initialize with an empty string
  });

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn'));
  const [error, setError] = useState('');
  const [userDetails, setUserDetails] = useState(JSON.parse(localStorage.getItem('userDetails'))); // Define userDetails

  useEffect(() => {
    if (!isLoggedIn) {
      setError('Please log in first to proceed with ecommerce.');
    } else {
      fetchAllProducts();
    }
  }, [isLoggedIn]);

  const fetchAllProducts = async () => {
    try {
      const response = await fetch('/api/getAllProducts');
      const products = await response.json();
      setMerchandiseList(products);
    } catch (error) {
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'merchCost' || name === 'merchQty' ? parseFloat(value) : value });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      setError('Please log in first to add a product.');
      return;
    }

    try {
      // Ensure userDetails is defined here
      const userDetails = JSON.parse(localStorage.getItem('userDetails'));

      const response = await fetch('http://localhost:3005/api/ecommerce/addproduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          profileId: userDetails.id,
          productName: formData.merchName + ' by ' + userDetails.firstname + ' ' + userDetails.lastname,
        }),
      });

      if (response.ok) {
        fetchAllProducts();
        setFormData({
          merchName: '',
          merchType: '',
          merchCost: '',
          merchQty: '',
          profileId: '',
        });
      } else {
        setError('Failed to add product. Please try again.');
      }
    } catch (error) {
      setError('Error adding product. Please try again.');
    }
  };

  return (
    <div>
      <h1>Welcome: {userDetails?.firstname} {userDetails?.lastname}</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h2>Merchandise Management</h2>

      <form onSubmit={handleAddProduct}>
        <label htmlFor="merchName">Merchandise Name:</label>
        <input type="text" id="merchName" name="merchName" value={formData.merchName} onChange={handleInputChange} required /><br /><br />

        <label htmlFor="merchType">Merchandise Type:</label>
        <input type="text" id="merchType" name="merchType" value={formData.merchType} onChange={handleInputChange} required /><br /><br />

        <label htmlFor="merchCost">Merchandise Cost:</label>
        <input type="number" id="merchCost" name="merchCost" value={formData.merchCost} onChange={handleInputChange} required /><br /><br />

        <label htmlFor="merchQty">Merchandise Quantity:</label>
        <input type="number" id="merchQty" name="merchQty" value={formData.merchQty} onChange={handleInputChange} required /><br /><br />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default MerchManagement;
