// // src/pages/Cart.jsx
// import React, { useEffect, useState, useContext } from "react";
// import { Container, Button, Badge } from "react-bootstrap";
// import axios from "axios";
// import { userContext } from "../App";
// import { ToastContainer, toast } from "react-toastify";
// import Navbar from "../components/navbar";
// import Footer from "../components/footer";
// import { Link, useNavigate } from "react-router-dom";
// import AOS from "aos";
// import "aos/dist/aos.css";

// const Cart = () => {
//   const { user } = useContext(userContext);
//   const [cartItems, setCartItems] = useState([]);
//   const [customerInfo, setCustomerInfo] = useState({
//     name: user?.name || "",
//     phone: "",
//     address: "",
//     pincode: "",
//   });
//   const navigate = useNavigate();
//   const userId = sessionStorage.getItem("userId");

//   useEffect(() => {
//     AOS.init({ duration: 800 });
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

//   const updateQty = (id, delta) => {
//     const item = cartItems.find((i) => i._id === id);
//     const newQty = item.quantity + delta;
//     if (newQty < 1) return;

//     axios
//       .put(`${process.env.REACT_APP_API_URL}/cart/update/${id}`, { quantity: newQty })
//       .then((res) => {
//         setCartItems((prev) => prev.map((i) => (i._id === id ? res.data : i)));
//       })
//       .catch(() => toast.error("Update failed"));
//   };

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

//   const handleCheckout = (e) => {
//     e.preventDefault();
//     if (!customerInfo.name || !customerInfo.phone || !customerInfo.address || !customerInfo.pincode) {
//       toast.error("Please fill all customer details");
//       return;
//     }

//     navigate("/order", {
//       state: { cart: cartItems, totalPrice: total, customerInfo },
//     });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setCustomerInfo((prev) => ({ ...prev, [name]: value }));
//   };

//   if (!userId) return null;

//   return (
//     <>
//       <Navbar />
//       <Container className="mt-4">
//         <h1 className="text-center p-3 cart-title fw-bold text-dark shadow-sm rounded" data-aos="fade-up">
//           Cart Items
//         </h1>

//         {cartItems.length === 0 ? (
//           <p className="text-center text-danger fs-5 fw-bold">Your cart is empty!</p>
//         ) : (
//           <>
//             <div className="table-responsive shadow-sm rounded p-3 bg-light" data-aos="fade-up">
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
//                   {cartItems.map((item, index) => {
//                     const imagePath = item.image || "https://via.placeholder.com/150x150?text=No+Image";
//                     return (
//                       <tr key={item._id} className="align-middle">
//                         <td className="fw-bold">{index + 1}</td>
//                         <td>
//                           <img
//                             src={imagePath}
//                             alt={item.pname}
//                             className="img-fluid rounded shadow"
//                             style={{ width: "60px", height: "60px", objectFit: "cover" }}
//                             onError={(e) => (e.target.src = "https://via.placeholder.com/150x150?text=Error")}
//                           />
//                         </td>
//                         <td className="fw-bold text-dark">{item.pname}</td>
//                         <td>
//                           <Button size="sm" variant="outline-secondary" onClick={() => updateQty(item._id, -1)} disabled={item.quantity <= 1}>
//                             -
//                           </Button>
//                           <span className="mx-2 fw-bold">{item.quantity}</span>
//                           <Button size="sm" variant="outline-secondary" onClick={() => updateQty(item._id, 1)}>
//                             +
//                           </Button>
//                         </td>
//                         <td className="fw-bold text-success">Rs. {(item.price * item.quantity).toFixed(2)}</td>
//                         <td>
//                           <Button variant="danger" size="sm" onClick={() => removeItem(item._id)}>
//                             Remove
//                           </Button>
//                         </td>
//                       </tr>
//                     );
//                   })}
//                   <tr className="table-info fw-bold">
//                     <td colSpan={4} className="text-end">Total Price:</td>
//                     <td colSpan={2} className="text-success fs-5">Rs. {total.toFixed(2)}</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>

//             {/* Customer Form */}
//             <div className="container mt-5 p-4 bg-light rounded shadow-sm">
//               <h3 className="text-center fw-bold text-dark customer-form-title mb-4" data-aos="fade-up">
//                 Customer Information
//               </h3>
//               <form onSubmit={handleCheckout} data-aos="fade-up">
//                 <div className="mb-3">
//                   <label className="form-label fw-bold">Customer Name</label>
//                   <input type="text" className="form-control shadow-sm" name="name" value={customerInfo.name} onChange={handleInputChange} required />
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label fw-bold">Phone Number</label>
//                   <input type="tel" className="form-control shadow-sm" name="phone" pattern="[0-9]{10}" value={customerInfo.phone} onChange={handleInputChange} required />
//                   <small className="text-muted">10 digits only</small>
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label fw-bold">Address</label>
//                   <textarea className="form-control shadow-sm" name="address" rows="3" value={customerInfo.address} onChange={handleInputChange} required />
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label fw-bold">Pincode</label>
//                   <input type="text" className="form-control shadow-sm" name="pincode" pattern="[0-9]{6}" value={customerInfo.pincode} onChange={handleInputChange} required />
//                   <small className="text-muted">6 digits only</small>
//                 </div>
//                 <div className="text-center">
//                   <Button type="submit" className="btn-success px-5 py-2 rounded-pill fw-bold">
//                     Checkout Order
//                   </Button>
//                 </div>
//               </form>
//             </div>
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
import { Container, Card, Button, Form, Badge } from "react-bootstrap";
import axios from "axios";
import { userContext } from "../App";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Link, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "../assets/css/cart.css";

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
    AOS.init({ duration: 600 });
    if (!userId) {
      toast.error("Please login");
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
        toast.success("Removed");
      })
      .catch(() => toast.error("Remove failed"));
  };

  const total = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const handleCheckout = (e) => {
    e.preventDefault();
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address || !customerInfo.pincode) {
      toast.error("Fill all fields");
      return;
    }
    navigate("/order", { state: { cart: cartItems, totalPrice: total, customerInfo } });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
  };

  if (!userId) return null;

  return (
    <>
      <Navbar />
      <Container className="py-4 cart-simple">
        <h2 className="text-center mb-4 fw-bold" data-aos="fade-up">
          My Cart
        </h2>

        {cartItems.length === 0 ? (
          <Card className="text-center p-5 empty-card" data-aos="zoom-in">
            <p className="fs-4 text-muted">Your cart is empty</p>
            <Link to="/display" className="btn btn-primary mt-3">
              Shop Now
            </Link>
          </Card>
        ) : (
          <>
            {/* Cart Items - Simple Cards */}
            {cartItems.map((item, i) => (
              <Card key={item._id} className="mb-3 item-card" data-aos="fade-up" data-aos-delay={i * 100}>
                <Card.Body className="d-flex align-items-center">
                  <img
                    src={item.image || "https://via.placeholder.com/80"}
                    alt={item.pname}
                    className="item-img me-3"
                  />
                  <div className="flex-grow-1">
                    <h6 className="mb-1 fw-bold">{item.pname}</h6>
                    <p className="mb-0 text-success fw-bold">₹{item.price.toFixed(2)}</p>
                  </div>

                  <div className="d-flex align-items-center me-3">
                    <Button size="sm" variant="outline-secondary" onClick={() => updateQty(item._id, -1)} disabled={item.quantity <= 1}>
                      −
                    </Button>
                    <Badge bg="dark" className="mx-2 px-3">{item.quantity}</Badge>
                    <Button size="sm" variant="outline-secondary" onClick={() => updateQty(item._id, 1)}>
                      +
                    </Button>
                  </div>
{/* 
                  <Button variant="danger" size="sm" onClick={() => removeItem(item._id)}>
                    Remove
                  </Button> */}
                  <Button
  variant="danger"
  size="sm"
  onClick={() => removeItem(item._id)}
  className="rounded-circle p-2 d-flex align-items-center justify-content-center shadow-sm"
  style={{ width: "36px", height: "36px" }}
  title="Remove Item"
>
  <i className="fas fa-trash-alt"></i>
</Button>
                </Card.Body>
              </Card>
            ))}

            {/* Total Card */}
            <Card className="mb-4 total-card" data-aos="fade-up">
              <Card.Body className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0 fw-bold">Total</h5>
                <h4 className="mb-0 text-success fw-bold">₹{total.toFixed(2)}</h4>
              </Card.Body>
            </Card>

            {/* Simple Form */}
            <Card className="p-4 form-card" data-aos="fade-up">
              <h5 className="mb-3 fw-bold">Delivery Info</h5>
              <Form onSubmit={handleCheckout}>
                <Form.Control
                  className="mb-3"
                  placeholder="Name"
                  name="name"
                  value={customerInfo.name}
                  onChange={handleInputChange}
                  required
                />
                <Form.Control
                  className="mb-3"
                  placeholder="Phone (10 digits)"
                  name="phone"
                  pattern="[0-9]{10}"
                  value={customerInfo.phone}
                  onChange={handleInputChange}
                  required
                />
                <Form.Control
                  as="textarea"
                  rows={2}
                  className="mb-3"
                  placeholder="Address"
                  name="address"
                  value={customerInfo.address}
                  onChange={handleInputChange}
                  required
                />
                <Form.Control
                  className="mb-3"
                  placeholder="Pincode (6 digits)"
                  name="pincode"
                  pattern="[0-9]{6}"
                  value={customerInfo.pincode}
                  onChange={handleInputChange}
                  required
                />
                <Button type="submit" className="w-100 checkout-btn btn-success">
                  Checkout
                </Button>
              </Form>
            </Card>
          </>
        )}
      </Container>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default Cart;