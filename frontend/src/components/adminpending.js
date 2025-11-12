
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../assets/css/dash.css';
import '../assets/css/ad.css';

const Adminpending = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAllOrders();
    }, []);

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
        AOS.refresh();
    }, []);

    const fetchAllOrders = async () => {
   
    
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/orders`); // Fetch only "Ordered", "Packed", "Shipped" orders
            
            if (!response.ok) {
                throw new Error(`Failed to fetch orders: ${response.status} ${response.statusText}`);
            }
    
            const data = await response.json();
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
          
        } finally {
            setLoading(false);
        }
    };
    

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/orders/${orderId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });

            if (response.ok) {
                setOrders(orders.map(order => 
                    order._id === orderId ? { ...order, status: newStatus } : order
                ));
                alert('Order status updated successfully!');
            } else {
                alert('Failed to update order status.');
            }
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    if (loading) return <p>Loading orders...</p>;

    return (
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
                <h2 className="text-center mt-4 pending-title" data-aos="fade-up">All Orders</h2>

                {orders.length === 0 ? (
                    <p className="text-center fw-5 text-danger" data-aos="fade-up">No orders found</p>
                ) : (
                    <div className="container mt-4">
                        <div className="table-responsive">
                            <table className="table table-hover text-center" data-aos="fade-up">
                                <thead>
                                    <tr>
                                        <th>Customer Name</th>
                                        <th>Phone</th>
                                        <th>Address</th>
                                        <th>Pincode</th>
                                        <th>User ID</th>
                                        <th>Order Date</th>
                                        <th>Cart Items</th>
                                        <th>Total Price</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map(order => (
                                        <tr key={order._id}>
                                            <td>{order.customerInfo.name}</td>
                                            <td>{order.customerInfo.phone}</td>
                                            <td>{order.customerInfo.address}</td>
                                            <td>{order.customerInfo.pincode}</td>
                                            <td>{order.userId || 'N/A'}</td>
                                            <td>{new Date(order.createdAt).toLocaleString()}</td>
                                            <td>
                                                <ul className="list-unstyled mb-0">
                                                    {order.cart.map((item, index) => (
                                                        <li key={index}>
                                                            {item.pname} x {item.quantity}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </td>
                                            <td>Rs-{order.totalPrice}</td>
                                            <td>
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                                                    className="form-select"
                                                >
                                                    <option value="Ordered">Ordered</option>
                                                    <option value="Packed">Packed</option>
                                                    <option value="Shipped">Shipped</option>
                                                    <option value="Delivered">Delivered</option>
                                                </select>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <button className="btn btn-primary mt-4" onClick={() => navigate('/adminorders')}>
                            View delivered Orders
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Adminpending;
