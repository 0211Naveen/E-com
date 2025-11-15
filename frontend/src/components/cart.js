

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Navbar from './navbar';
// import '../assets/css/products.css';
// import Footer from './footer';
// import AOS from 'aos';

// const Cart = ({ cart, removeFromCart, updateQuantity }) => {
//   // Customer info
//   const [customerInfo, setCustomerInfo] = useState({
//     name: '',
//     phone: '',
//     address: '',
//     pincode: '',
//   });

//   const navigate = useNavigate();

//   // ✅ Calculate total price
//   const totalPrice = cart.reduce(
//     (total, item) => total + item.price * (item.quantity || 1),
//     0
//   );

//   // ✅ Handle input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setCustomerInfo({ ...customerInfo, [name]: value });
//   };

//   // ✅ Handle checkout form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     navigate('/order', {
//       state: {
//         cart,
//         totalPrice,
//         customerInfo,
//       },
//     });
//   };

//   useEffect(() => {
//     AOS.init({});
//     AOS.refresh();
//   }, []);

//   return (
//     <>
//       <Navbar />
//       <div className="container mt-4">
//         {/* 🛒 Cart Title */}
//         <h1
//           className="text-center p-3 cart-title fw-bold text-dark shadow-sm rounded"
//           data-aos="fade-up"
//         >
//           Cart Items 🛒
//         </h1>

//         {/* 🕊️ Empty Cart */}
//         {cart && cart.length === 0 ? (
//           <p className="text-center text-danger fs-5 fw-bold">
//             Your cart is empty!
//           </p>
//         ) : (
//           <>
//             {/* 🧾 Cart Table */}
//             <div
//               className="table-responsive shadow-sm rounded p-3 bg-light"
//               data-aos="fade-up"
//             >
//               <table className="table text-center">
//                 <thead className="thead-light">
//                   <tr className="bg-primary text-white">
//                     <th>S.No</th>
//                     <th>Image</th>
//                     <th>Product Name</th>
//                     <th>Quantity</th>
//                     <th>Price</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {cart.map((item, index) => {
//                     // ✅ Use Cloudinary URL directly
//                     const imagePath = item.image
//                       ? item.image // full Cloudinary URL
//                       : 'https://via.placeholder.com/150x150?text=No+Image';

//                     return (
//                       <tr key={item._id} className="align-middle">
//                         <td className="fw-bold">{index + 1}</td>

//                         {/* Product Image */}
//                         <td>
//                           <img
//                             src={imagePath}
//                             alt={item.pname}
//                             className="img-fluid rounded shadow"
//                             style={{
//                               width: '60px',
//                               height: '60px',
//                               objectFit: 'cover',
//                             }}
//                             onError={(e) => {
//                               e.target.src =
//                                 'https://via.placeholder.com/150x150?text=Image+Error';
//                             }}
//                           />
//                         </td>

//                         {/* Product Name */}
//                         <td className="fw-bold text-dark">{item.pname}</td>

//                         {/* Quantity Controls */}
//                         <td>
//                           <button
//                             onClick={() =>
//                               updateQuantity(
//                                 item._id,
//                                 Math.max(item.quantity - 1, 1)
//                               )
//                             }
//                             className="btn btn-outline-secondary btn-sm"
//                             disabled={item.quantity <= 1}
//                           >
//                             -
//                           </button>
//                           <span className="mx-2 fw-bold">
//                             {item.quantity || 1}
//                           </span>
//                           <button
//                             onClick={() =>
//                               updateQuantity(item._id, item.quantity + 1)
//                             }
//                             className="btn btn-outline-secondary btn-sm"
//                           >
//                             +
//                           </button>
//                         </td>

//                         {/* Price */}
//                         <td className="fw-bold text-success">
//                           Rs. {(item.price * (item.quantity || 1)).toFixed(2)}
//                         </td>

//                         {/* Remove Button */}
//                         <td>
//                           <button
//                             onClick={() => removeFromCart(item._id)}
//                             className="btn btn-danger btn-sm shadow-sm"
//                           >
//                             Remove
//                           </button>
//                         </td>
//                       </tr>
//                     );
//                   })}

//                   {/* 🧮 Total Price */}
//                   <tr className="table-info fw-bold">
//                     <td colSpan={4} className="text-end">
//                       Total Price:
//                     </td>
//                     <td colSpan={2} className="text-success fs-5">
//                       Rs. {totalPrice?.toFixed(2)}
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </>
//         )}

//         {/* 📦 Customer Info Form */}
//         <div className="container mt-5 p-4 bg-light rounded shadow-sm">
//           <h3
//             className="text-center fw-bold text-dark customer-form-title mb-4"
//             data-aos="fade-up"
//           >
//             Customer Information 📦
//           </h3>
//           <form onSubmit={handleSubmit} data-aos="fade-up">
//             {/* Name */}
//             <div className="mb-3">
//               <label htmlFor="customerName" className="form-label fw-bold">
//                 Customer Name
//               </label>
//               <input
//                 type="text"
//                 className="form-control shadow-sm"
//                 id="customerName"
//                 name="name"
//                 placeholder="Enter full name"
//                 value={customerInfo.name}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>

//             {/* Phone */}
//             <div className="mb-3">
//               <label htmlFor="phone" className="form-label fw-bold">
//                 Phone Number
//               </label>
//               <input
//                 type="tel"
//                 className="form-control shadow-sm"
//                 id="phone"
//                 name="phone"
//                 placeholder="Enter phone number"
//                 pattern="[0-9]{10}"
//                 value={customerInfo.phone}
//                 onChange={handleInputChange}
//                 required
//               />
//               <small className="form-text text-muted">
//                 Phone number must be 10 digits.
//               </small>
//             </div>

//             {/* Address */}
//             <div className="mb-3">
//               <label htmlFor="address" className="form-label fw-bold">
//                 Address
//               </label>
//               <textarea
//                 className="form-control shadow-sm"
//                 id="address"
//                 name="address"
//                 rows="3"
//                 placeholder="Enter your address"
//                 value={customerInfo.address}
//                 onChange={handleInputChange}
//                 required
//               ></textarea>
//             </div>

//             {/* Pincode */}
//             <div className="mb-3">
//               <label htmlFor="pincode" className="form-label fw-bold">
//                 Pincode
//               </label>
//               <input
//                 type="text"
//                 className="form-control shadow-sm"
//                 id="pincode"
//                 name="pincode"
//                 placeholder="Enter pincode"
//                 pattern="[0-9]{6}"
//                 value={customerInfo.pincode}
//                 onChange={handleInputChange}
//                 required
//               />
//               <small className="form-text text-muted">
//                 Pincode must be 6 digits.
//               </small>
//             </div>

//             {/* Checkout Button */}
//             <div className="text-center">
//               <button
//                 type="submit"
//                 className="btn btn-success px-5 py-2 shadow-sm rounded-pill fw-bold"
//               >
//                 Checkout Order 🚀
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>

//       <Footer />
//     </>
//   );
// };

// export default Cart;








// // src/pages/Cart.jsx
// import React, { useEffect, useState, useContext } from "react";
// import { Container, Card, Button, Row, Col, Badge } from "react-bootstrap";
// import axios from "axios";
// import { userContext } from "../App";
// import { ToastContainer, toast } from "react-toastify";
// import Navbar from "../components/navbar";
// import Footer from "../components/footer";
// import { Link, useNavigate } from "react-router-dom";

// const Cart = () => {
//   const { user } = useContext(userContext);
//   const [cartItems, setCartItems] = useState([]);
//   const navigate = useNavigate();

//   const userId = sessionStorage.getItem("userId");

//   // ---- FETCH CART ----
//   useEffect(() => {
//     if (!userId) {
//       toast.error("Please login to view cart");
//       navigate("/login");
//       return;
//     }

//     axios
//       .get(`${process.env.REACT_APP_API_URL}/cart/${userId}`)
//       .then((res) => setCartItems(res.data))
//       .catch(() => toast.error("Failed to load cart"));
//   }, [userId, navigate]);

//   // ---- UPDATE QTY ----
//   const updateQty = (id, delta) => {
//     const item = cartItems.find((i) => i._id === id);
//     const newQty = item.quantity + delta;
//     if (newQty < 1) return;

//     axios
//       .put(`${process.env.REACT_APP_API_URL}/cart/update/${id}`, { quantity: newQty })
//       .then((res) => {
//         setCartItems((prev) =>
//           prev.map((i) => (i._id === id ? res.data : i))
//         );
//       })
//       .catch(() => toast.error("Update failed"));
//   };

//   // ---- REMOVE ITEM ----
//   const removeItem = (id) => {
//     axios
//       .delete(`${process.env.REACT_APP_API_URL}/cart/remove/${id}`)
//       .then(() => {
//         setCartItems((prev) => prev.filter((i) => i._id !== id));
//         toast.success("Item removed");
//       })
//       .catch(() => toast.error("Remove failed"));
//   };

//   const total = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

//   if (!userId) return null;

//   return (
//     <>
//       <Navbar />
//       <Container className="py-5">
//         <h2 className="mb-4">
//           Shopping Cart <Badge bg="secondary">{cartItems.length}</Badge>
//         </h2>

//         {cartItems.length === 0 ? (
//           <Card className="p-4 text-center">
//             <p>Your cart is empty.</p>
//             <Link to="/" className="btn btn-primary">
//               Continue Shopping
//             </Link>
//           </Card>
//         ) : (
//           <>
//             {cartItems.map((item) => (
//               <Card key={item._id} className="mb-3">
//                 <Row className="g-0 align-items-center">
//                   <Col md={2}>
//                     <img
//                       src={item.image || "https://via.placeholder.com/150"}
//                       alt={item.pname}
//                       className="img-fluid rounded"
//                       style={{ height: "100px", objectFit: "cover" }}
//                     />
//                   </Col>
//                   <Col md={6}>
//                     <Card.Body>
//                       <h5>{item.pname}</h5>
//                       <p className="text-muted">₹{item.price}</p>
//                     </Card.Body>
//                   </Col>
//                   <Col md={2} className="text-center">
//                     <Button
//                       size="sm"
//                       variant="outline-secondary"
//                       onClick={() => updateQty(item._id, -1)}
//                     >
//                       -
//                     </Button>
//                     <span className="mx-2 fw-bold">{item.quantity}</span>
//                     <Button
//                       size="sm"
//                       variant="outline-secondary"
//                       onClick={() => updateQty(item._id, 1)}
//                     >
//                       +
//                     </Button>
//                   </Col>
//                   <Col md={2} className="text-end pe-4">
//                     <Button
//                       variant="danger"
//                       size="sm"
//                       onClick={() => removeItem(item._id)}
//                     >
//                       Remove
//                     </Button>
//                   </Col>
//                 </Row>
//               </Card>
//             ))}

//             <Card className="mt-4 p-3">
//               <Row>
//                 <Col className="text-end">
//                   <h4>Total: ₹{total.toFixed(2)}</h4>
//                   <Button variant="success" className="mt-2">
//                     Proceed to Checkout
//                   </Button>
//                 </Col>
//               </Row>
//             </Card>
//           </>
//         )}
//       </Container>
//       <Footer />
//       <ToastContainer />
//     </>
//   );
// };

// export default Cart;



// src/pages/Cart.jsx
import React, { useEffect, useState, useContext } from "react";
import { Container, Button, Badge } from "react-bootstrap";
import axios from "axios";
import { userContext } from "../App";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Link, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Cart = () => {
  const { user } = useContext(userContext);
  const [cartItems, setCartItems] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: user?.name || "",
    phone: "",
    address: "",
    pincode: "",
  });
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    AOS.init({ duration: 800 });
    if (!userId) {
      toast.error("Please login to view cart");
      navigate("/login");
      return;
    }

    axios
      .get(`${process.env.REACT_APP_API_URL}/cart/${userId}`)
      .then((res) => setCartItems(res.data))
      .catch(() => toast.error("Failed to load cart"));
  }, [userId, navigate]);

  const updateQty = (id, delta) => {
    const item = cartItems.find((i) => i._id === id);
    const newQty = item.quantity + delta;
    if (newQty < 1) return;

    axios
      .put(`${process.env.REACT_APP_API_URL}/cart/update/${id}`, { quantity: newQty })
      .then((res) => {
        setCartItems((prev) => prev.map((i) => (i._id === id ? res.data : i)));
      })
      .catch(() => toast.error("Update failed"));
  };

  const removeItem = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/cart/remove/${id}`)
      .then(() => {
        setCartItems((prev) => prev.filter((i) => i._id !== id));
        toast.success("Item removed");
      })
      .catch(() => toast.error("Remove failed"));
  };

  const total = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const handleCheckout = (e) => {
    e.preventDefault();
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address || !customerInfo.pincode) {
      toast.error("Please fill all customer details");
      return;
    }

    navigate("/order", {
      state: { cart: cartItems, totalPrice: total, customerInfo },
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
  };

  if (!userId) return null;

  return (
    <>
      <Navbar />
      <Container className="mt-4">
        <h1 className="text-center p-3 cart-title fw-bold text-dark shadow-sm rounded" data-aos="fade-up">
          Cart Items
        </h1>

        {cartItems.length === 0 ? (
          <p className="text-center text-danger fs-5 fw-bold">Your cart is empty!</p>
        ) : (
          <>
            <div className="table-responsive shadow-sm rounded p-3 bg-light" data-aos="fade-up">
              <table className="table text-center">
                <thead className="thead-light">
                  <tr className="bg-primary text-white">
                    <th>S.No</th>
                    <th>Image</th>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => {
                    const imagePath = item.image || "https://via.placeholder.com/150x150?text=No+Image";
                    return (
                      <tr key={item._id} className="align-middle">
                        <td className="fw-bold">{index + 1}</td>
                        <td>
                          <img
                            src={imagePath}
                            alt={item.pname}
                            className="img-fluid rounded shadow"
                            style={{ width: "60px", height: "60px", objectFit: "cover" }}
                            onError={(e) => (e.target.src = "https://via.placeholder.com/150x150?text=Error")}
                          />
                        </td>
                        <td className="fw-bold text-dark">{item.pname}</td>
                        <td>
                          <Button size="sm" variant="outline-secondary" onClick={() => updateQty(item._id, -1)} disabled={item.quantity <= 1}>
                            -
                          </Button>
                          <span className="mx-2 fw-bold">{item.quantity}</span>
                          <Button size="sm" variant="outline-secondary" onClick={() => updateQty(item._id, 1)}>
                            +
                          </Button>
                        </td>
                        <td className="fw-bold text-success">Rs. {(item.price * item.quantity).toFixed(2)}</td>
                        <td>
                          <Button variant="danger" size="sm" onClick={() => removeItem(item._id)}>
                            Remove
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                  <tr className="table-info fw-bold">
                    <td colSpan={4} className="text-end">Total Price:</td>
                    <td colSpan={2} className="text-success fs-5">Rs. {total.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Customer Form */}
            <div className="container mt-5 p-4 bg-light rounded shadow-sm">
              <h3 className="text-center fw-bold text-dark customer-form-title mb-4" data-aos="fade-up">
                Customer Information
              </h3>
              <form onSubmit={handleCheckout} data-aos="fade-up">
                <div className="mb-3">
                  <label className="form-label fw-bold">Customer Name</label>
                  <input type="text" className="form-control shadow-sm" name="name" value={customerInfo.name} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Phone Number</label>
                  <input type="tel" className="form-control shadow-sm" name="phone" pattern="[0-9]{10}" value={customerInfo.phone} onChange={handleInputChange} required />
                  <small className="text-muted">10 digits only</small>
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Address</label>
                  <textarea className="form-control shadow-sm" name="address" rows="3" value={customerInfo.address} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Pincode</label>
                  <input type="text" className="form-control shadow-sm" name="pincode" pattern="[0-9]{6}" value={customerInfo.pincode} onChange={handleInputChange} required />
                  <small className="text-muted">6 digits only</small>
                </div>
                <div className="text-center">
                  <Button type="submit" className="btn-success px-5 py-2 rounded-pill fw-bold">
                    Checkout Order
                  </Button>
                </div>
              </form>
            </div>
          </>
        )}
      </Container>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default Cart;