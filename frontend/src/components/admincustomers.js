

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Adminnavbar from './adminnavbar';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../assets/css/dash.css';
import { Link } from 'react-router-dom';

function Admincustomers() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        // Fetch customers from the backend
        fetchCustomers();
    }, []);

    useEffect(() => {
        // Initialize AOS
        AOS.init({ duration: 1000, once: true });
        AOS.refresh();
    }, []);

    const fetchCustomers = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/Admincustomers`)
            .then((response) => {
                setCustomers(response.data);
            })
            .catch((error) => {
                console.error("Error fetching customers:", error);
            });
    };

    const handleDeleteCustomer = async (customerId) => {
        if (window.confirm("Are you sure you want to delete this customer?")) {
            try {
                const response = await axios.delete(`${process.env.REACT_APP_API_URL}/customers/${customerId}`);
                if (response.status === 200) {
                    alert("Customer deleted successfully");
                    setCustomers(customers.filter(customer => customer._id !== customerId)); // Update state
                }
            } catch (error) {
                console.error("Error deleting customer:", error);
                alert("Failed to delete customer");
            }
        }
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

                {/* Main Content */}
                <div className="main-content">
                    {/* <Adminnavbar /> */}
                    <div className="container mt-5">
                        <h2 className="text-center mb-4 admin-customers-title" data-aos="fade-up">Users</h2>
                        <div className="table-responsive">
                            <table className="table table-hover text-center" data-aos="fade-up">
                                <thead>
                                    <tr>
                                        <th>S.no</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {customers.map((customer, index) => (
                                        <tr key={customer._id}>
                                            <td>{index + 1}</td>
                                            <td>{customer.name}</td>
                                            <td>{customer.email}</td>
                                            <td>
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={() => handleDeleteCustomer(customer._id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default Admincustomers;
