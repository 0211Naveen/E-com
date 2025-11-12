
// import React, { useEffect, useState } from 'react';
// import Adminnavbar from './adminnavbar';
// import '../assets/css/dash.css';
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import { Link } from 'react-router-dom';
// import '../assets/css/ad.css';

// const AdminConfirmedOrders = () => {
//     const [confirmedOrders, setConfirmedOrders] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         fetchConfirmedOrders();
//     }, []);

//     useEffect(() => {
//         AOS.init({ duration: 1000, once: true });
//         AOS.refresh();
//     }, []);

//     const fetchConfirmedOrders = async () => {
//         setLoading(true);
//         setError(null); // Clear previous errors
//         try {
//             const response = await fetch('http://localhost:3001/orders?status=Delivered'); // Change "confirmed" to "Delivered"
//             if (!response.ok) throw new Error('Failed to fetch delivered orders');
//             const data = await response.json();
//             setConfirmedOrders(data);
//         } catch (error) {
//             setError(error.message);
//         } finally {
//             setLoading(false);
//         }
//     };
    

//     if (loading) return <p>Loading confirmed orders...</p>;

//     if (error) return (
//         <div className="text-center">
//             <p className="text-danger">Error: {error}</p>
//             <button className="btn btn-primary" onClick={fetchConfirmedOrders}>Retry</button>
//         </div>
//     );

//     return (
        
//         <>
//             <div className="admin-container">
//                 {/* Sidebar */}
                
//                   <div className="sidebar" style={{ padding: '10px', height: '100vh' }}>
//                                     <Link to="/dash">
//                                         <h2 className='sidebar-title' style={{ marginBottom: '20px', fontSize: '1.5rem' }}>Dashboard</h2>
//                                     </Link>
                
//                                     <ul className="sidebar-menu" style={{ padding: '0', margin: '0' }}>
//                                         <li style={{ margin: '10px 0' }}>
//                                             <Link to="/displayproduct" style={{ padding: '8px 10px', display: 'block' }}>
//                                                 <i className="fas fa-box" style={{ marginRight: '8px' }}></i> Products
//                                             </Link>
//                                         </li>
//                                         <li style={{ margin: '10px 0' }}>
//                                             <Link to="/admincustomers" style={{ padding: '8px 10px', display: 'block' }}>
//                                                 <i className="fas fa-users" style={{ marginRight: '8px' }}></i> Users
//                                             </Link>
//                                         </li>
//                                         <li style={{ margin: '10px 0' }}>
//                                             <Link to="/adminpending" style={{ padding: '8px 10px', display: 'block' }}>
//                                                 <i className="fas fa-truck" style={{ marginRight: '8px' }}></i> Pending Orders
//                                             </Link>
//                                         </li>
//                                         <li style={{ margin: '10px 0' }}>
//                                             <Link to="/adminorders" style={{ padding: '8px 10px', display: 'block' }}>
//                                                 <i className="fa-solid fa-pen-to-square" style={{ marginRight: '8px' }}></i> Orders
//                                             </Link>
//                                         </li>
//                                         <li style={{ margin: '10px 0' }}>
//                                             <Link to="/addproducts" style={{ padding: '8px 10px', display: 'block' }}>
//                                                 <i className="fa-solid fa-cart-plus" style={{ marginRight: '8px' }}></i> Add Product
//                                             </Link>
//                                         </li>
//                                         <li style={{ margin: '10px 0' }}>
//                                             <Link to="/adminimages" style={{ padding: '8px 10px', display: 'block' }}>
//                                                 <i className="fa-regular fa-image" style={{ marginRight: '8px' }}></i> Add Images
//                                             </Link>
//                                         </li>
//                                         <li style={{ margin: '10px 0' }}>
//                                             <Link to="/group" style={{ padding: '8px 10px', display: 'block' }}>
//                                                 <i className="fas fa-shield-alt" style={{ marginRight: '8px' }}></i> Privileges
//                                             </Link>
//                                         </li>
//                                     </ul>
//                                 </div>

//                 {/* Main Content */}
//                 <div className="main-content">
//                     {/* <Adminnavbar /> */}
//                     <h2 className="text-center mt-4 Confirmed-Orders-title" data-aos="fade-up">Confirmed Orders</h2>
//                     {confirmedOrders.length === 0 ? (
//                         <p className="text-center fw-5 text-danger" data-aos="fade-up">No confirmed orders</p>
//                     ) : (
//                         <div className="container mt-4">
//                             <div className="table-responsive">
//                                 <table className="table table-hover text-center" data-aos="fade-up">
//                                     <thead>
//                                         <tr>
//                                             <th>Order ID</th>
//                                             <th>Customer Name</th>
//                                             <th>Phone</th>
//                                             <th>Address</th>
//                                             <th>Pincode</th>
//                                             <th>Order Date</th>
//                                             <th>Cart Items</th>
//                                             <th>Total Price</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {confirmedOrders.map((order) => (
//                                             <tr key={order._id}>
//                                                 <td>{order._id}</td>
//                                                 <td>{order.customerInfo.name}</td>
//                                                 <td>{order.customerInfo.phone}</td>
//                                                 <td>{order.customerInfo.address}</td>
//                                                 <td>{order.customerInfo.pincode}</td>
//                                                 <td>{new Date(order.createdAt).toLocaleString()}</td>
//                                                 <td>
//                                                     <ul className="list-unstyled mb-0">
//                                                         {order.cart.map((item, index) => (
//                                                             <li key={index}>
//                                                                 {item.pname} x {item.quantity}
//                                                             </li>
//                                                         ))}
//                                                     </ul>
//                                                 </td>
//                                                 <td>Rs-{order.totalPrice}</td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </table>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </>

//     );
// };

// export default AdminConfirmedOrders;


import React, { useEffect, useState } from 'react';
import Adminnavbar from './adminnavbar';
import '../assets/css/dash.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
import '../assets/css/ad.css';

const AdminDeliveredOrders = () => {
    const [deliveredOrders, setDeliveredOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchDeliveredOrders();
    }, []);

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
        AOS.refresh();
    }, []);

    const fetchDeliveredOrders = async () => {
        setLoading(true);
        setError(null); // Clear previous errors
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/orders/delivered`); // FIXED URL
            if (!response.ok) throw new Error('Failed to fetch delivered orders');
            const data = await response.json();
            console.log('Delivered Orders:', data); // ✅ Log data to check response
            setDeliveredOrders(data);
        } catch (error) {
            console.error('Error fetching delivered orders:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    
    

    if (loading) return <p>Loading delivered orders...</p>;

 
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
                    <h2 className="text-center mt-4 Confirmed-Orders-title" data-aos="fade-up">Delivered Orders</h2>
                    {deliveredOrders.length === 0 ? (
                        <p className="text-center fw-5 text-danger" data-aos="fade-up">No delivered orders</p>
                    ) : (
                        <div className="container mt-4">
                            <div className="table-responsive">
                                <table className="table table-hover text-center" data-aos="fade-up">
                                    <thead>
                                        <tr>
                                            <th>Order ID</th>
                                            <th>Customer Name</th>
                                            <th>Phone</th>
                                            <th>Address</th>
                                            <th>Pincode</th>
                                            <th>Order Date</th>
                                            <th>Cart Items</th>
                                            <th>Total Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {deliveredOrders.map((order) => (
                                            <tr key={order._id}>
                                                <td>{order._id}</td>
                                                <td>{order.customerInfo.name}</td>
                                                <td>{order.customerInfo.phone}</td>
                                                <td>{order.customerInfo.address}</td>
                                                <td>{order.customerInfo.pincode}</td>
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
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default AdminDeliveredOrders;
