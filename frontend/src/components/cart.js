

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




import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar';
import Footer from './footer';
import '../assets/css/products.css';
import AOS from 'aos';
import axios from 'axios';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: '',
    pincode: '',
  });

  const navigate = useNavigate();
  const userId = sessionStorage.getItem("userId");

  // ============================
  // 🔥 FETCH CART ITEMS FROM BACKEND
  // ============================
  const fetchCart = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/cart/${userId}`);
      setCart(response.data);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // ============================
  // 🔥 UPDATE QUANTITY
  // ============================
  const updateQuantity = async (cartItemId, newQty) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/cart/update/${cartItemId}`, {
        quantity: newQty,
      });

      fetchCart(); // refresh cart
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  // ============================
  // ❌ REMOVE ITEM FROM CART
  // ============================
  const removeFromCart = async (cartItemId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/cart/remove/${cartItemId}`);
      fetchCart();
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  // Calculate total price
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo({ ...customerInfo, [name]: value });
  };

  // Checkout / Move to Order page
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/order', {
      state: {
        cart,
        totalPrice,
        customerInfo,
      },
    });
  };

  useEffect(() => {
    AOS.init({});
    AOS.refresh();
  }, []);

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <h1 className="text-center p-3 cart-title fw-bold text-dark shadow-sm rounded" data-aos="fade-up">
          Cart Items 🛒
        </h1>

        {cart.length === 0 ? (
          <p className="text-center text-danger fs-5 fw-bold">Your cart is empty!</p>
        ) : (
          <div className="table-responsive shadow-sm rounded p-3 bg-light" data-aos="fade-up">
            <table className="table text-center">
              <thead className="thead-light bg-primary text-white">
                <tr>
                  <th>S.No</th>
                  <th>Image</th>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {cart.map((item, index) => {
                  const imagePath = item.image || "https://via.placeholder.com/150";

                  return (
                    <tr key={item._id} className="align-middle">
                      <td className="fw-bold">{index + 1}</td>

                      <td>
                        <img
                          src={imagePath}
                          alt={item.productName}
                          className="img-fluid rounded shadow"
                          style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                        />
                      </td>

                      <td className="fw-bold text-dark">{item.productName}</td>

                      <td>
                        <button
                          onClick={() => updateQuantity(item._id, Math.max(item.quantity - 1, 1))}
                          className="btn btn-outline-secondary btn-sm"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>

                        <span className="mx-2 fw-bold">{item.quantity}</span>

                        <button
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          className="btn btn-outline-secondary btn-sm"
                        >
                          +
                        </button>
                      </td>

                      <td className="fw-bold text-success">
                        Rs. {(item.price * item.quantity).toFixed(2)}
                      </td>

                      <td>
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="btn btn-danger btn-sm shadow-sm"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}

                <tr className="table-info fw-bold">
                  <td colSpan={4} className="text-end">Total Price:</td>
                  <td colSpan={2} className="text-success fs-5">
                    Rs. {totalPrice.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Customer Form */}
        <div className="container mt-5 p-4 bg-light rounded shadow-sm">
          <h3 className="text-center fw-bold text-dark mb-4" data-aos="fade-up">
            Customer Information 📦
          </h3>

          <form onSubmit={handleSubmit} data-aos="fade-up">
            <div className="mb-3">
              <label className="form-label fw-bold">Name</label>
              <input type="text" className="form-control" name="name" required value={customerInfo.name} onChange={handleInputChange} />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Phone</label>
              <input type="text" className="form-control" name="phone" required value={customerInfo.phone} onChange={handleInputChange} />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Address</label>
              <textarea className="form-control" name="address" required value={customerInfo.address} onChange={handleInputChange}></textarea>
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Pincode</label>
              <input type="text" className="form-control" name="pincode" required value={customerInfo.pincode} onChange={handleInputChange} />
            </div>

            <div className="text-center">
              <button className="btn btn-success px-5 py-2 rounded-pill fw-bold">Checkout Order 🚀</button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Cart;
