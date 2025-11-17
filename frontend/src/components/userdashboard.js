// import React, { useEffect, useState, useContext } from 'react';
// import Navbar from './navbar';
// import Footer from './footer';
// import { userContext } from '../App';
// import '../assets/css/userOrders.css';

// const UserOrders = () => {
//     const [orders, setOrders] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const { user } = useContext(userContext);

//     useEffect(() => {
//         if (user && user.userId) {
//             fetchUserOrders(user.userId);
//         }
//     }, [user]);

//     const fetchUserOrders = async (userId) => {
//         try {
//             const response = await fetch(`${process.env.REACT_APP_API_URL}/orders/${userId}`);
//             if (!response.ok) {
//                 throw new Error('Failed to fetch orders');
//             }

//             const data = await response.json();
//             console.log("Fetched Orders:", data); // ✅ Console log orders
//             setOrders(data);
//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const getStatusIndex = (status) => {
//         const statuses = ["Ordered", "Packed", "Shipped", "Delivered"];
//         return statuses.indexOf(status);
//     };



//     return (
//         <>
//             <Navbar />
           
//             <div className="container mt-4">
//                 <h2 className="text-center my-order-title">My Orders</h2>

//                 {user && (
//                     <p className="text-center user-name">Welcome, {user.name} 👋</p>
//                 )}

//                 {orders.length === 0 ? (
//                     <p className="text-center no-orders">You have no orders yet.</p>
//                 ) : (
//                     <div className="order-list">
//                         {orders.map((order) => {
//                             const orderDate = new Date(order.createdAt);
//                             const estimatedDeliveryDate = new Date(orderDate);
//                             estimatedDeliveryDate.setDate(orderDate.getDate() + 5); // Assuming delivery takes 5 days

//                             const deliveredDate = order.deliveredDate ? new Date(order.deliveredDate).toLocaleString() : null;

//                             return (
//                                 <div key={order._id} className="order-card">
//                                     <div className="order-header">
//                                         <span className="order-date">Ordered on: {orderDate.toLocaleString()}</span>
//                                     </div>

//                                     <div className="order-items">
//                                         {order.cart.map((item, index) => (
//                                             <div key={index} className="order-item">
//                                                 <span className="product-name"> Product: {item.pname}</span>
//                                                 <span className="product-qty ms-2 fs-5 fw-5">x {item.quantity}</span>
//                                             </div>
//                                         ))}
//                                     </div>

//                                     <div className="order-price">
//                                         <strong>Total: ₹{order.totalPrice.toFixed(2)}</strong>
//                                     </div>

//                                     {/* ✅ Display user shipping details */}
//                                     {order.customerInfo && (
//                                         <div className="user-address mt-2">
//                                             <p className='product-name'>Address: {order.customerInfo.address}</p>
//                                             <p className='product-name'>Pincode: {order.customerInfo.pincode}</p>
//                                             <p className='product-name'>📞 {order.customerInfo.phone}</p>
//                                         </div>
//                                     )}

//                                     {/* ✅ Show Delivered Date if Available */}
//                                     {deliveredDate && (
//                                         <div className="delivered-info">
//                                             ✅ Delivered on: <strong>{deliveredDate}</strong>
//                                         </div>
//                                     )}

//                                     <div className="order-status">
//                                         <div className="status-bar">
//                                             {["Ordered", "Packed", "Shipped", "Delivered"].map((step, index) => (
//                                                 <div key={index} className={`status-step ${getStatusIndex(order.status) >= index ? "active" : ""}`}>
//                                                     <span className="status-dot"></span>
//                                                     <span className="status-label">{step}</span>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     </div>
//                                 </div>
//                             );
//                         })}
//                     </div>
//                 )}
//             </div>

//             <Footer />
//         </>
//     );
// };

// export default UserOrders;



// src/pages/UserOrders.jsx
import React, { useEffect, useState, useContext } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import { userContext } from "../App";
import AOS from "aos";
import "aos/dist/aos.css";
import "../assets/css/userOrders.css";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(userContext);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    if (user && user.userId) {
      fetchUserOrders(user.userId);
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchUserOrders = async (userId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/orders/${userId}`);
      if (!response.ok) throw new Error("Failed to fetch orders");
      const data = await response.json();
      setOrders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIndex = (status) => {
    const steps = ["Ordered", "Packed", "Shipped", "Delivered"];
    return steps.indexOf(status);
  };

  const formatDate = (date) => new Date(date).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });

  if (loading) return <div className="text-center py-5"><div className="spinner"></div></div>;
  if (error) return <p className="text-center text-danger py-5">Error: {error}</p>;

  return (
    <>
      <Navbar />
      <div className="user-orders-container">
        <div className="container py-5">
          <h1 className="text-center display-5 fw-bold mb-2" data-aos="fade-up">
            My Orders
          </h1>
          <p className="text-center text-muted mb-5" data-aos="fade-up" data-aos-delay="100">
            Welcome back, <strong className="text-primary">{user?.name || "Guest"}</strong>!
          </p>

          {orders.length === 0 ? (
            <div className="text-center py-5" data-aos="zoom-in">
              <i className="fas fa-box-open fa-3x text-muted mb-3"></i>
              <p className="fs-4 text-muted">No orders yet. Start shopping!</p>
            </div>
          ) : (
            <div className="row g-4">
              {orders.map((order, idx) => {
                const orderDate = new Date(order.createdAt);
                const estDelivery = new Date(orderDate);
                estDelivery.setDate(orderDate.getDate() + 5);
                const deliveredDate = order.deliveredDate ? new Date(order.deliveredDate) : null;
                const currentStep = getStatusIndex(order.status);

                return (
                  <div key={order._id} className="col-lg-8 mx-auto" data-aos="fade-up" data-aos-delay={idx * 100}>
                    <div className="order-card-glass">
                      {/* Header */}
                      <div className="order-header">
                        <div>
                          {/* <span className="badge-order-id">Order #{order._id.slice(-6)}</span> */}
                          <p className="mb-0 text-muted small">
                            <i className="fas fa-calendar-alt me-1"></i>
                            {formatDate(order.createdAt)}
                          </p>
                        </div>
                        <div className="text-end">
                          <h5 className="mb-0 text-success fw-bold">₹{order.totalPrice.toFixed(2)}</h5>
                          <small className="text-muted">Total</small>
                        </div>
                      </div>

                      <hr className="my-3" />

                      {/* Items */}
                      <div className="order-items">
                        {order.cart.map((item, i) => (
                          <div key={i} className="d-flex align-items-center mb-2">
                            <div className="item-thumb me-3">
                              <img
                                src={item.image || "https://via.placeholder.com/60"}
                                alt={item.pname}
                                className="rounded"
                                onError={(e) => (e.target.src = "https://via.placeholder.com/60?text=IMG")}
                              />
                            </div>
                            <div className="flex-grow-1">
                              <p className="mb-0 fw-6">{item.pname}</p>
                              <small className="text-muted">Qty: {item.quantity}</small>
                            </div>
                            <span className="text-muted">₹{(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>

                      <hr className="my-3" />

                      {/* Address */}
                      {order.customerInfo && (
                        <div className="address-box">
                          <p className="mb-1">
                            <i className="fas fa-map-marker-alt text-primary me-2"></i>
                            <strong>Deliver to:</strong> {order.customerInfo.name}
                          </p>
                          <p className="mb-1 ms-4 small text-muted">
                            {order.customerInfo.address}, {order.customerInfo.pincode}
                          </p>
                          <p className="mb-0 ms-4 small text-muted">
                            <i className="fas fa-phone"></i> {order.customerInfo.phone}
                          </p>
                        </div>
                      )}

                      {/* Delivery Estimate */}
                      {!deliveredDate && (
                        <p className="text-warning small mt-2">
                          <i className="fas fa-truck me-1"></i>
                          Est. Delivery: {estDelivery.toLocaleDateString()}
                        </p>
                      )}

                      {deliveredDate && (
                        <p className="text-success small mt-2">
                          <i className="fas fa-check-circle me-1"></i>
                          Delivered on: <strong>{formatDate(deliveredDate)}</strong>
                        </p>
                      )}

                      {/* Progress Bar */}
                      <div className="status-tracker mt-4">
                        {["Ordered", "Packed", "Shipped", "Delivered"].map((step, i) => {
                          const isActive = currentStep >= i;
                          const isDone = currentStep > i;
                          return (
                            <div key={i} className="status-step">
                              <div className={`status-circle ${isActive ? "active" : ""} ${isDone ? "done" : ""}`}>
                                {isDone ? <i className="fas fa-check"></i> : i + 1}
                              </div>
                              <span className={`status-label ${isActive ? "active" : ""}`}>{step}</span>
                              {i < 3 && <div className={`status-line ${isActive ? "active" : ""}`}></div>}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserOrders;