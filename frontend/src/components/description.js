
// Description.js
import React, { useState } from 'react';
import axios from 'axios';
// import { Navbar } from 'react-bootstrap';
import Navbar from './navbar';

const Description = () => {
    const [id, setId] = useState(''); // State for the input ID
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFetchProduct = () => {
        setLoading(true);
        setError(null); // Clear any previous errors

        // Fetch product by ID from the server
        axios.get(`http://localhost:3001/addproducts/${id}`)
            .then(response => {
                setProduct(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setError("Product not found");
                setLoading(false);
            });
    };

    return (
        <>
       <Navbar />
      
        <div className="container mt-5">
            <h1>Product Description</h1>

            {/* Input for Product ID */}
            <input
                type="text"
                placeholder="Enter product ID"
                value={id}
                onChange={(e) => setId(e.target.value)}
                style={{ marginRight: '10px' }}
            />
            <button onClick={handleFetchProduct}>Fetch Product</button>

            {/* Loading, Error, and Product Display */}
            {loading && <p>Loading product details...</p>}
            {error && <p>{error}</p>}
            {product && (
                <div>
                    <h2>{product.pname}</h2>
                    <p><strong>Price:</strong> Rs {product.price}</p>
                    <p><strong>Description:</strong> {product.desc}</p>
                    <img 
                        src={`http://localhost:3001/${product.image}`} 
                        alt={product.pname} 
                        style={{ maxWidth: '100%', height: 'auto' }} 
                    />
                </div>
            )}
        </div>
        
        </>
    );
};

export default Description;
