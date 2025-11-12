import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Adminnavbar from './adminnavbar';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../assets/css/dash.css';
import { Link } from 'react-router-dom';




const Storeeditproducts = () => {
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
        axios.get(`http://localhost:3001/addproducts/${productId}`)
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
        axios.put(`http://localhost:3001/addproducts/${productId}`, formData)
            .then(() => {
                alert("Product updated successfully!");
                // navigate("/displayproduct"); // Redirect back to products list
            })
            .catch(err => console.error("Failed to update product:", err));
    };


    const logout = () => {

        sessionStorage.setItem("isLoggedIn", "false"); // Set logged-in status to false
        navigate('/storelog'); // Redirect to login page or any other page
    };

    const login = () => {

        navigate('/storelog'); // Redirect to login page or any other page
    };


    return product ? (
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
                    <div className="container mt-5">
                        <h2 className='edtiproducts-title text-center' data-aos="fade-up">Edit Product</h2>
                        <form onSubmit={handleSubmit} data-aos="fade-up">

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

export default Storeeditproducts;
