import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link, useNavigate } from 'react-router-dom';


const AdminDashboard = () => {
    const [customerCount, setCustomerCount] = useState(0);
    const [orderCount, setOrderCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the customer count from the backend
        axios.get(`${process.env.REACT_APP_API_URL}/count1`)
            .then(response => {
                setCustomerCount(response.data.count); // Set the count from response
            })
            .catch(error => {
                console.error("Error fetching customer count:", error);
            });
    }, []);

    useEffect(() => {
        const fetchOrderCount = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/countorders`);
                const data = await response.json();
                setOrderCount(data.count);
            } catch (error) {
                console.error('Error fetching order count:', error);
            }
        };

        fetchOrderCount();
    }, []);


    useEffect(() => {
        // Initialize AOS
        AOS.init({
            duration: 1000, // Optional: animation duration
            once: true // Optional: animation only happens once
        });
        AOS.refresh();
    }, []);


    const logout = () => {

        sessionStorage.setItem("isLoggedIn", "false"); // Set logged-in status to false
        navigate('/adminlog'); // Redirect to login page or any other page
    };

    return (

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

                {/* Main Dashboard Content */}
                <div className="dashboard-content">
                    <div className='d-flex'>
                        <button onClick={logout} className='btn btn-primary ms-auto'>Logout</button>
                    </div>


                    <h1 className="dashboard-title" data-aos="zoom-in">Admin</h1>


                    <div className="dashboard-cards container">
                        <Link to="/displayproduct" className="dashboard-card" data-aos="zoom-in">
                            <h2>Products</h2>
                            <i className="fas fa-box icon"></i>
                        </Link>
                        <Link to="/admincustomers" className="dashboard-card" data-aos="zoom-in">
                            <h2>Users</h2>
                            <p className="count">{customerCount}</p>
                            <i className="fas fa-users icon"></i>
                        </Link>
                        <Link to="/adminpending" className="dashboard-card" data-aos="zoom-in">
                            <h2>Pending Orders</h2>
                            <i className="fas fa-truck icon"></i>
                        </Link>
                        <Link to="/adminorders" className="dashboard-card" data-aos="zoom-in">
                            <h2>Orders</h2>
                            <p className="count">{orderCount}</p>
                            <i className="fa-solid fa-pen-to-square icon"></i>
                        </Link>
                        <Link to="/addproducts" className="dashboard-card" data-aos="zoom-in">
                            <h2>Add Product</h2>
                            <i className="fa-solid fa-cart-plus icon"></i>
                        </Link>
                        <Link to="/adminimages" className="dashboard-card" data-aos="zoom-in">
                            <h2>Add Images</h2>
                            <i className="fa-regular fa-image icon"></i>
                        </Link>
                    </div>
                </div>
            </div>
        </>

    );
};

export default AdminDashboard;
