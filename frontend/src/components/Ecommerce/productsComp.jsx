import React, { useState, useEffect } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [userDetails, setUserDetails] = useState(JSON.parse(localStorage.getItem('userDetails')));

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3005/api/ecommerce/products');
        if (response.ok) {
          const productsData = await response.json();
          setProducts(productsData);
        } else {
          throw new Error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to fetch products. Please try again later.');
      }
    };

    fetchProducts();
  }, []);

  const getPostedBy = (product) => {
    console.log('userDetails:', userDetails);
    console.log('product.userId:', product.userId);

    if (userDetails && userDetails.id === product.userId) {
      return `${userDetails.firstname} ${userDetails.lastname}`;
    } else {
      return product.postedBy || 'Unknown User';
    }
  };

  return (
    <div>
      <h1>All Products</h1>
      {error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <p>ID: {product.id}</p>
              <p>Name: {product.merchName}</p>
              <p>Type: {product.merchType}</p>
              <p>Cost: {product.merchCost}</p>
              <p>Quantity: {product.merchQty}</p>
              <p>Posted By: {getPostedBy(product)}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;
