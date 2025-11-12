import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../assets/css/dash.css';
import { Link } from 'react-router-dom';
import '../assets/css/ad.css';



const Admineditproducts = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [formData, setFormData] = useState({
        pname: '',
        price: '',
        desc: '',
        image: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/addproducts/${productId}`)
            .then(response => {
                setProduct(response.data);
                setFormData({
                    pname: response.data.pname,
                    price: response.data.price,
                    desc: response.data.desc,
                    image: response.data.image
                });
            })
            .catch(err => console.error("Failed to fetch product:", err));
    }, [productId]);

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
        AOS.refresh();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`${process.env.REACT_APP_API_URL}/addproducts/${productId}`, formData)
            .then(() => {
                alert("Product updated successfully!");
                // navigate("/displayproduct"); // Redirect back to products list
            })
            .catch(err => console.error("Failed to update product:", err));
    };

    return product ? (
        <>
         <div className="admin-container">
             {/* Sidebar */}
            
                            <div className="sidebar" style={{ padding: '10px', height: '100vh' }}>
                                <Link to="/dash">
                                    <h2 className='sidebar-title' style={{ marginBottom: '20px', fontSize: '1.5rem' }}>Dashboard</h2>
                                </Link>
            
                                <ul className="sidebar-menu" style={{ padding: '0', margin: '0' }}>
                                    <li style={{ margin: '10px 0' }}>
                                        <Link to="/displayproduct" style={{ padding: '8px 10px', display: 'block' }}>
                                            <i className="fas fa-box" style={{ marginRight: '8px' }}></i> Products
                                        </Link>
                                    </li>
                                    <li style={{ margin: '10px 0' }}>
                                        <Link to="/admincustomers" style={{ padding: '8px 10px', display: 'block' }}>
                                            <i className="fas fa-users" style={{ marginRight: '8px' }}></i> Users
                                        </Link>
                                    </li>
                                    <li style={{ margin: '10px 0' }}>
                                        <Link to="/adminpending" style={{ padding: '8px 10px', display: 'block' }}>
                                            <i className="fas fa-truck" style={{ marginRight: '8px' }}></i> Pending Orders
                                        </Link>
                                    </li>
                                    <li style={{ margin: '10px 0' }}>
                                        <Link to="/adminorders" style={{ padding: '8px 10px', display: 'block' }}>
                                            <i className="fa-solid fa-pen-to-square" style={{ marginRight: '8px' }}></i> Orders
                                        </Link>
                                    </li>
                                    <li style={{ margin: '10px 0' }}>
                                        <Link to="/addproducts" style={{ padding: '8px 10px', display: 'block' }}>
                                            <i className="fa-solid fa-cart-plus" style={{ marginRight: '8px' }}></i> Add Product
                                        </Link>
                                    </li>
                                    <li style={{ margin: '10px 0' }}>
                                        <Link to="/adminimages" style={{ padding: '8px 10px', display: 'block' }}>
                                            <i className="fa-regular fa-image" style={{ marginRight: '8px' }}></i> Add Images
                                        </Link>
                                    </li>
                                    <li style={{ margin: '10px 0' }}>
                                        <Link to="/group" style={{ padding: '8px 10px', display: 'block' }}>
                                            <i className="fas fa-shield-alt" style={{ marginRight: '8px' }}></i> Privileges
                                        </Link>
                                    </li>
                                </ul>
                            </div>
         
      
         <div className="main-content"> 
        <div className="container mt-5">
            <h2 className='edtiproducts-title text-center' data-aos="fade-up">Edit Product</h2>
            <form onSubmit={handleSubmit} data-aos="fade-up">
            {/* <div className="mb-3">
                    <label className="form-label">Product Image</label>
                    <input
                        type="text"
                        name="pimage"
                        value={formData.image}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div> */}
                <div className="mb-3">
                    <label className="form-label">Product Name</label>
                    <input
                        type="text"
                        name="pname"
                        value={formData.pname}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Price</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                        name="desc"
                        value={formData.desc}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn SaveChanges-btn">Save Changes</button>
            </form>
        </div>
        </div>
        </div>
        </>
    ) : (
        <p>Loading...</p>
    );
};

export default Admineditproducts;
