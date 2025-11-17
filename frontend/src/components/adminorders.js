
// import React, { useEffect, useState } from 'react';
// import Adminnavbar from './adminnavbar';
// import '../assets/css/dash.css';
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import { Link } from 'react-router-dom';
// import '../assets/css/ad.css';

// const AdminDeliveredOrders = () => {
//     const [deliveredOrders, setDeliveredOrders] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         fetchDeliveredOrders();
//     }, []);

//     useEffect(() => {
//         AOS.init({ duration: 1000, once: true });
//         AOS.refresh();
//     }, []);

//     const fetchDeliveredOrders = async () => {
//         setLoading(true);
//         setError(null); // Clear previous errors
//         try {
//             const response = await fetch(`${process.env.REACT_APP_API_URL}/orders/delivered`); // FIXED URL
//             if (!response.ok) throw new Error('Failed to fetch delivered orders');
//             const data = await response.json();
//             console.log('Delivered Orders:', data); // ✅ Log data to check response
//             setDeliveredOrders(data);
//         } catch (error) {
//             console.error('Error fetching delivered orders:', error);
//             setError(error.message);
//         } finally {
//             setLoading(false);
//         }
//     };
    
    

//     if (loading) return <p>Loading delivered orders...</p>;

 
//     return (
//         <>
//             <div className="admin-container">
//                 {/* Sidebar */}
//                 <div className="sidebar" style={{ padding: '10px', height: '100vh' }}>
//                             <Link to="/dash">
//                                 <h2 className='sidebar-title' style={{ marginBottom: '20px', fontSize: '1.5rem' }}>Dashboard</h2>
//                             </Link>
        
//                             <ul className="sidebar-menu" style={{ padding: '0', margin: '0' }}>
//                                 <li style={{ margin: '10px 0' }}>
//                                     <Link to="/displayproduct" style={{ padding: '8px 10px', display: 'block' }}>
//                                         <i className="fas fa-box" style={{ marginRight: '8px' }}></i> Products
//                                     </Link>
//                                 </li>
//                                 <li style={{ margin: '10px 0' }}>
//                                     <Link to="/admincustomers" style={{ padding: '8px 10px', display: 'block' }}>
//                                         <i className="fas fa-users" style={{ marginRight: '8px' }}></i> Users
//                                     </Link>
//                                 </li>
//                                 <li style={{ margin: '10px 0' }}>
//                                     <Link to="/adminpending" style={{ padding: '8px 10px', display: 'block' }}>
//                                         <i className="fas fa-truck" style={{ marginRight: '8px' }}></i> Pending Orders
//                                     </Link>
//                                 </li>
//                                 <li style={{ margin: '10px 0' }}>
//                                     <Link to="/adminorders" style={{ padding: '8px 10px', display: 'block' }}>
//                                         <i className="fa-solid fa-pen-to-square" style={{ marginRight: '8px' }}></i> Orders
//                                     </Link>
//                                 </li>
//                                 <li style={{ margin: '10px 0' }}>
//                                     <Link to="/addproducts" style={{ padding: '8px 10px', display: 'block' }}>
//                                         <i className="fa-solid fa-cart-plus" style={{ marginRight: '8px' }}></i> Add Product
//                                     </Link>
//                                 </li>
//                                 <li style={{ margin: '10px 0' }}>
//                                     <Link to="/adminimages" style={{ padding: '8px 10px', display: 'block' }}>
//                                         <i className="fa-regular fa-image" style={{ marginRight: '8px' }}></i> Add Images
//                                     </Link>
//                                 </li>
//                                 <li style={{ margin: '10px 0' }}>
//                                     <Link to="/group" style={{ padding: '8px 10px', display: 'block' }}>
//                                         <i className="fas fa-shield-alt" style={{ marginRight: '8px' }}></i> Privileges
//                                     </Link>
//                                 </li>
//                             </ul>
//                         </div>

//                 {/* Main Content */}
//                 <div className="main-content">
//                     <h2 className="text-center mt-4 Confirmed-Orders-title" data-aos="fade-up">Delivered Orders</h2>
//                     {deliveredOrders.length === 0 ? (
//                         <p className="text-center fw-5 text-danger" data-aos="fade-up">No delivered orders</p>
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
//                                         {deliveredOrders.map((order) => (
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

// export default AdminDeliveredOrders;




// src/pages/AdminDeliveredOrders.jsx
import React, { useEffect, useState, useMemo } from "react";
import Adminnavbar from "./adminnavbar";
import "../assets/css/dash.css";
import "../assets/css/ad.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import { Button, Form, InputGroup, Table } from "react-bootstrap";
import { utils, writeFile } from "xlsx";
import { saveAs } from "file-saver";

const AdminDeliveredOrders = () => {
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ── Filters ───────────────────────
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // ── Fetch data ─────────────────────
  useEffect(() => {
    fetchDeliveredOrders();
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const fetchDeliveredOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/orders/delivered`);
      if (!res.ok) throw new Error("Failed to fetch delivered orders");
      const data = await res.json();
      setDeliveredOrders(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ── Computed values ─────────────────
  const totalRevenue = useMemo(() => {
    return deliveredOrders.reduce((sum, o) => sum + o.totalPrice, 0);
  }, [deliveredOrders]);

  const filteredOrders = useMemo(() => {
    return deliveredOrders.filter((order) => {
      const matchesSearch =
        order._id.toLowerCase().includes(search.toLowerCase()) ||
        order.customerInfo.name.toLowerCase().includes(search.toLowerCase()) ||
        order.customerInfo.phone.includes(search);

      const orderDate = new Date(order.createdAt);
      const afterStart = startDate ? orderDate >= new Date(startDate) : true;
      const beforeEnd = endDate ? orderDate <= new Date(endDate + "T23:59:59") : true;

      return matchesSearch && afterStart && beforeEnd;
    });
  }, [deliveredOrders, search, startDate, endDate]);

  // ── Excel export ───────────────────
  const exportToExcel = () => {
    const wsData = filteredOrders.map((o, idx) => ({
      "S.No": idx + 1,
      "Order ID": o._id,
      "Customer": o.customerInfo.name,
      "Phone": o.customerInfo.phone,
      "Address": o.customerInfo.address,
      "Pincode": o.customerInfo.pincode,
      "Order Date": new Date(o.createdAt).toLocaleString(),
      "Items": o.cart.map((i) => `${i.pname} x ${i.quantity}`).join("; "),
      "Total": `₹${o.totalPrice}`,
    }));

    const ws = utils.json_to_sheet(wsData);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Delivered Orders");
    const excelBuffer = writeFile(wb, "Delivered_Orders.xlsx", { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, `Delivered_Orders_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  // ── UI ─────────────────────────────
  if (loading) return <p className="text-center mt-5">Loading delivered orders...</p>;
  if (error) return <p className="text-center text-danger mt-5">{error}</p>;

  return (
    <>
      <div className="admin-container">
        {/* ── Sidebar ── */}
        <div className="sidebar" style={{ padding: "10px", height: "100vh" }}>
          <Link to="/dash">
            <h2 className="sidebar-title" style={{ marginBottom: "20px", fontSize: "1.5rem" }}>
              Dashboard
            </h2>
          </Link>

          <ul className="sidebar-menu" style={{ padding: 0, margin: 0 }}>
            {[
              { to: "/displayproduct", icon: "fas fa-box", text: "Products" },
              { to: "/admincustomers", icon: "fas fa-users", text: "Users" },
              { to: "/adminpending", icon: "fas fa-truck", text: "Pending Orders" },
              { to: "/adminorders", icon: "fa-solid fa-pen-to-square", text: "Orders" },
              { to: "/addproducts", icon: "fa-solid fa-cart-plus", text: "Add Product" },
              { to: "/adminimages", icon: "fa-regular fa-image", text: "Add Images" },
              { to: "/group", icon: "fas fa-shield-alt", text: "Privileges" },
            ].map((item) => (
              <li key={item.to} style={{ margin: "10px 0" }}>
                <Link to={item.to} style={{ padding: "8px 10px", display: "block" }}>
                  <i className={item.icon} style={{ marginRight: "8px" }}></i> {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Main Content ── */}
        <div className="main-content">
          {/* Revenue Card */}
          <div className="p-3 bg-success text-white rounded mb-4 d-flex justify-content-between align-items-center" data-aos="fade-down">
            <h4 className="mb-0">Total Revenue (Delivered)</h4>
            <h3 className="mb-0">₹{totalRevenue.toLocaleString("en-IN")}</h3>
          </div>

          {/* Controls */}
          <div className="d-flex flex-wrap gap-3 mb-4" data-aos="fade-up">
            <InputGroup style={{ maxWidth: "300px" }}>
              <InputGroup.Text>Search</InputGroup.Text>
              <Form.Control
                placeholder="Name / Phone / Order ID"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </InputGroup>

            <Form.Control
              type="date"
              placeholder="Start Date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={{ maxWidth: "180px" }}
            />
            <Form.Control
              type="date"
              placeholder="End Date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              style={{ maxWidth: "180px" }}
            />

            <Button variant="outline-primary" onClick={exportToExcel}>
              Export Excel
            </Button>
          </div>

          {/* Table */}
          <h2 className="text-center mt-3 mb-4" data-aos="fade-up">
            Delivered Orders
          </h2>

          {filteredOrders.length === 0 ? (
            <p className="text-center text-danger" data-aos="fade-up">
              No delivered orders match the filters.
            </p>
          ) : (
            <div className="table-responsive" data-aos="fade-up">
              <Table hover bordered className="text-center align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>S.No</th>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Pincode</th>
                    <th>Order Date</th>
                    <th>Items</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order, idx) => (
                    <tr key={order._id}>
                      <td>{idx + 1}</td>
                      <td>{order._id}</td>
                      <td>{order.customerInfo.name}</td>
                      <td>{order.customerInfo.phone}</td>
                      <td>{order.customerInfo.address}</td>
                      <td>{order.customerInfo.pincode}</td>
                      <td>{new Date(order.createdAt).toLocaleString("en-IN")}</td>
                      <td>
                        <ul className="list-unstyled mb-0">
                          {order.cart.map((it, i) => (
                            <li key={i}>
                              {it.pname} × {it.quantity}
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className="fw-bold text-success">₹{order.totalPrice}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminDeliveredOrders;