// import React from 'react';
// import { Link } from 'react-router-dom';
// import '../assets/css/products.css';
// import Footer from './footer';
// import Navbar from './navbar';

// const Wishlist = ({ wishlist }) => {
//   if (wishlist.length === 0) {
//     return (
//       <>
//         <Navbar />
//         <div className="container text-center mt-5">
//           <h2 className="wishlist-title">Your wishlist is empty 🕊️</h2>
//           <p className="text-muted">Start adding some favorite antique items!</p>
//           <Link to="/displayproduct" className="btn btn-dark mt-3">
//             Browse Products
//           </Link>
//         </div>
//         <Footer />
//       </>
//     );
//   }

//   return (
//     <>
//       <Navbar />
//       <div className="container mt-4">
//         <h1 className="text-center wishlist-title mb-4">My Wishlist ❤️</h1>

//         <div className="row">
//           {wishlist.map((item) => {
//             // ✅ Use Cloudinary image directly
//             const imagePath = item.image
//               ? item.image // full Cloudinary URL
//               : 'https://via.placeholder.com/300x200?text=No+Image';

//             return (
//               <div className="col-md-4 mb-4" key={item._id}>
//                 <div className="card h-100 shadow-sm border-0 rounded-3">
//                   <div className="image-container">
//                     <img
//                       src={imagePath}
//                       alt={item.pname}
//                       className="img-fluid rounded-top"
//                       style={{
//                         width: '100%',
//                         height: '250px',
//                         objectFit: 'cover',
//                       }}
//                       onError={(e) => {
//                         e.target.src = 'https://via.placeholder.com/300x200?text=Image+Error';
//                       }}
//                     />
//                   </div>
//                   <div className="card-body d-flex flex-column">
//                     <h5 className="card-title">{item.pname}</h5>
//                     <p className="card-text text-muted">Price: Rs. {item.price}</p>

//                     <div className="mt-auto">
//                       <Link
//                         to={`/hi/${item._id}`}
//                         className="btn product-btn w-100"
//                       >
//                         View Product
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Wishlist;





// src/pages/Wishlist.jsx
import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Row, Col, Button } from "react-bootstrap";
import Navbar from "./navbar";
import Footer from "./footer";
import { userContext } from "../App";
import { ToastContainer, toast } from "react-toastify";
import "../assets/css/products.css";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const { user } = useContext(userContext);
  const navigate = useNavigate();
  const userId = user?._id || user?.userId || sessionStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      toast.error("Please login");
      navigate("/login");
      return;
    }

    axios.get(`${process.env.REACT_APP_API_URL}/wishlist/${userId}`)
      .then(res => setWishlist(res.data))
      .catch(() => toast.error("Failed to load wishlist"));
  }, [userId, navigate]);

  const removeFromWishlist = (productId) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/wishlist/${userId}/${productId}`)
      .then(() => {
        setWishlist(prev => prev.filter(item => item._id !== productId));
        toast.success("Removed from wishlist");
      })
      .catch(() => toast.error("Remove failed"));
  };

  if (wishlist.length === 0) {
    return (
      <>
        <Navbar />
        <div className="container text-center py-5">
          <h2 className="mb-3">Your wishlist is empty</h2>
          <p className="text-muted">Add items you love!</p>
          <Link to="/display" className="btn btn-dark px-4 py-2 rounded-pill">
            Browse Products
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container py-4">
        <h1 className="text-center mb-4">My Wishlist</h1>

        <Row className="justify-content-center">
          {wishlist.map(item => {
            const imagePath = item.image || "https://via.placeholder.com/300x200?text=No+Image";

            return (
              <Col lg={3} md={4} sm={6} xs={12} key={item._id} className="mb-4">
                <Card className="h-100 shadow-sm border-0">
                  <div className="position-relative">
                    <img
                      src={imagePath}
                      alt={item.pname}
                      className="card-img-top"
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <Button
                      size="sm"
                      variant="danger"
                      className="position-absolute top-0 end-0 m-2 rounded-circle p-2"
                      onClick={() => removeFromWishlist(item._id)}
                    >
                      X
                    </Button>
                  </div>
                  <Card.Body className="d-flex flex-column text-center">
                    <h5 className="card-title mb-2">{item.pname}</h5>
                    <p className="text-success fw-bold mb-3">₹{item.price}</p>
                    <div className="mt-auto">
                      <Link
                        to={`/hi/${item._id}`}
                        className="btn btn-dark w-100 rounded-pill py-2"
                      >
                        View Details
                      </Link>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default Wishlist;