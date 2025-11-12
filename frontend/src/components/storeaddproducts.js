import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import '../assets/css/products.css'
import AOS from 'aos';
import '../assets/css/ad.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Storeaddproducts = () => {
    const [pname, setpname] = useState('')
    const [price, setprice] = useState('')
    const [desc, setdesc] = useState('')
    const [file, setfile] = useState()
const navigate = useNavigate();

    const logout = () => {

        sessionStorage.setItem("isLoggedIn", "false"); // Set logged-in status to false
        navigate('/storelog'); // Redirect to login page or any other page
    };

    const login = () => {

        navigate('/storelog'); // Redirect to login page or any other page
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        // Create FormData object
        const formData = new FormData();
        formData.append('pname', pname);
        formData.append('price', price);
        formData.append('desc', desc);
        if (file) {
            formData.append('image', file); // Append image file if it exists
        }

        axios.post("http://localhost:3001/addproducts", formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Set the appropriate content type for file upload
            },
        })
            .then(result => {
                console.log(result);
                // Display success alert
                alert("Product added successfully!");
            })
            .catch(err => {
                console.log(err);
                // Display error alert
                alert("Error adding product. Please try again.");
            });
    };


    useEffect(() => {
        AOS.init({

        });
        AOS.refresh(); // Refresh AOS on component update
    }, []);

    return (

        <>

            <div className="admin-container">

                {/* side-bar */}

                 <div className="sidebar" style={{ padding: '10px', height: '100vh' }}>
                                <Link to="/show">
                                    <h2 className='sidebar-title' style={{ marginBottom: '20px', fontSize: '1.5rem' }}>Store</h2>
                                </Link>
                
                                <ul className="sidebar-menu" style={{ padding: '0', margin: '0' }}>
                                    <li style={{ margin: '10px 0' }}>
                                        <Link to="/show" style={{ padding: '8px 10px', display: 'block' }}>
                                            <i className="fas fa-tachometer-alt" style={{ marginRight: '8px' }}></i>
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li style={{ margin: '10px 0' }}>
                                        <div style={{ padding: '8px 10px', display: 'block' }}>
                                            <i className="fas fa-sign-in-alt" style={{ marginRight: '8px', fontSize: '1.5rem', cursor: 'pointer' }}></i>
                                            <button onClick={login} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'white', fontSize: '1.2rem' }}>
                                                Login
                                            </button>
                
                                        </div>
                                    </li>
                                    <li style={{ margin: '10px 0' }}>
                                        <div style={{ padding: '8px 10px', display: 'flex', alignItems: 'center' }}>
                                            <i className="fas fa-sign-out-alt" style={{ marginRight: '8px', fontSize: '1.5rem', cursor: 'pointer' }}></i>
                                            <button onClick={logout} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'white', fontSize: '1.2rem' }}>
                                                Logout
                                            </button>
                                        </div>
                                    </li>
                                </ul>
                            </div>


                {/* main-content */}

                <div className="main-content">
                    <div className="container add-products-container">
                        <h1 className="text-center add-products-title mb-3" data-aos="fade-up">Add Products</h1>
                        <Form onSubmit={handleSubmit} data-aos="fade-up">
                            <Form.Group className="mb-3" controlId="Name">
                                <Form.Label className="product-label">Product Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter product name"
                                    onChange={(e) => setpname(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="Price">
                                <Form.Label className="product-label">Price</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter price"
                                    onChange={(e) => setprice(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="Description">
                                <Form.Label className="product-label">Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Enter product description"
                                    onChange={(e) => setdesc(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="ImageUpload">
                                <Form.Label className="product-label">Upload Product Image</Form.Label>
                                <Form.Control
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setfile(e.target.files[0])}
                                    required
                                />
                            </Form.Group>

                            <Button type="submit" className="product-btn">
                                Add Product
                            </Button>
                        </Form>
                    </div>
                </div>

            </div>
        </>

    )
}

export default Storeaddproducts
