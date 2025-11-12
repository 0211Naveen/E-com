import React, { useEffect, useState, useContext } from 'react';
import Navbar from './navbar';
import Footer from './footer';
import { userContext } from '../App';
import '../assets/css/userOrders.css';

const UserOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useContext(userContext);

    useEffect(() => {
        if (user && user.userId) {
            fetchUserOrders(user.userId);
        }
    }, [user]);

    const fetchUserOrders = async (userId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/orders/${userId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }

            const data = await response.json();
            console.log("Fetched Orders:", data); // ✅ Console log orders
            setOrders(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const getStatusIndex = (status) => {
        const statuses = ["Ordered", "Packed", "Shipped", "Delivered"];
        return statuses.indexOf(status);
    };



    return (
        <>
            <Navbar />
           
            <div className="container mt-4">
                <h2 className="text-center my-order-title">My Orders</h2>

                {user && (
                    <p className="text-center user-name">Welcome, {user.name} 👋</p>
                )}

                {orders.length === 0 ? (
                    <p className="text-center no-orders">You have no orders yet.</p>
                ) : (
                    <div className="order-list">
                        {orders.map((order) => {
                            const orderDate = new Date(order.createdAt);
                            const estimatedDeliveryDate = new Date(orderDate);
                            estimatedDeliveryDate.setDate(orderDate.getDate() + 5); // Assuming delivery takes 5 days

                            const deliveredDate = order.deliveredDate ? new Date(order.deliveredDate).toLocaleString() : null;

                            return (
                                <div key={order._id} className="order-card">
                                    <div className="order-header">
                                        <span className="order-date">Ordered on: {orderDate.toLocaleString()}</span>
                                    </div>

                                    <div className="order-items">
                                        {order.cart.map((item, index) => (
                                            <div key={index} className="order-item">
                                                <span className="product-name"> Product: {item.pname}</span>
                                                <span className="product-qty ms-2 fs-5 fw-5">x {item.quantity}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="order-price">
                                        <strong>Total: ₹{order.totalPrice.toFixed(2)}</strong>
                                    </div>

                                    {/* ✅ Display user shipping details */}
                                    {order.customerInfo && (
                                        <div className="user-address mt-2">
                                            <p className='product-name'>Address: {order.customerInfo.address}</p>
                                            <p className='product-name'>Pincode: {order.customerInfo.pincode}</p>
                                            <p className='product-name'>📞 {order.customerInfo.phone}</p>
                                        </div>
                                    )}

                                    {/* ✅ Show Delivered Date if Available */}
                                    {deliveredDate && (
                                        <div className="delivered-info">
                                            ✅ Delivered on: <strong>{deliveredDate}</strong>
                                        </div>
                                    )}

                                    <div className="order-status">
                                        <div className="status-bar">
                                            {["Ordered", "Packed", "Shipped", "Delivered"].map((step, index) => (
                                                <div key={index} className={`status-step ${getStatusIndex(order.status) >= index ? "active" : ""}`}>
                                                    <span className="status-dot"></span>
                                                    <span className="status-label">{step}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            <Footer />
        </>
    );
};

export default UserOrders;
