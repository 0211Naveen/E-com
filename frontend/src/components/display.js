
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Navbar from './navbar';
// import Footer from './footer';
// import { Link, useNavigate } from "react-router-dom";
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import '../assets/css/products.css';

// const Display = ({ addToCart }) => {
//   const [products, setProducts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const navigate = useNavigate();

//   // ✅ Fetch products from backend
//   useEffect(() => {
//     axios.get(`${process.env.REACT_APP_API_URL}/addproducts`)
//       .then(response => setProducts(response.data))
//       .catch(err => console.log("Error fetching products:", err));
//   }, []);

//   // ✅ Initialize AOS animation
//   useEffect(() => {
//     AOS.init({ duration: 1000, once: true });
//     AOS.refresh();
//   }, []);

//   // ✅ Add to cart with Toast Notification
//   const handleAddToCart = (product) => {
//     addToCart(product);

//     toast.success(`${product.pname} added to cart!`, {
//       position: "top-center",
//       autoClose: 2000,
//       hideProgressBar: true,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: false,
//     });
//   };

//   // ✅ Filter by search term
//   const filteredProducts = products.filter(product =>
//     product.pname.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <>
//       <Navbar />

//       <div className="container">
//         <p className="text-center p-3 product-title" data-aos="fade-up">
//           Antique Products
//         </p>

//         {/* 🔍 Search Bar */}
//         <div className="row justify-content-center mb-4">
//           <div className="col-md-6">
//             <input
//               type="text"
//               className="form-control search-bar"
//               placeholder="🔍 Search for products..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//         </div>

//         {/* 🖼️ Product Grid */}
//         <div className="row" data-aos="fade-up">
//           {filteredProducts.length > 0 ? (
//             filteredProducts.map(product => {
//               // ✅ Cloudinary image URL (directly stored in DB)
//               const imagePath = product.image
//                 ? product.image // full Cloudinary URL
//                 : 'https://via.placeholder.com/300x200?text=No+Image';

//               return (
//                 <div className="col-md-4 mb-4" key={product._id}>
//                   <div className="card h-100 shadow product-card">
//                     <div className="image-container">
//                       <img
//                         src={imagePath}
//                         alt={product.pname}
//                         className="card-img-top product-image"
//                         onError={(e) => {
//                           e.target.src = 'https://via.placeholder.com/300x200?text=Image+Error';
//                         }}
//                       />
//                     </div>

//                     <div className="card-body d-flex flex-column">
//                       <h5 className="card-title product-name">{product.pname}</h5>
//                       <p className="card-text product-price">Rs - {product.price}</p>

//                       <div className="mt-auto">
//                         <button
//                           className="btn add-to-cart-btn w-100 mb-2"
//                           onClick={() => handleAddToCart(product)}
//                         >
//                           Add to Cart
//                         </button>

//                         <Link
//                           to={`/hi/${product._id}`}
//                           className="btn view-details-btn w-100"
//                         >
//                           View Details
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })
//           ) : (
//             <p className="text-center mt-4">No products found.</p>
//           )}
//         </div>
//       </div>

//       <Footer />

//       {/* Toast Notification Container */}
//       <ToastContainer />
//     </>
//   );
// };

// export default Display;




// src/pages/Display.jsx
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Navbar from "./navbar";
import Footer from "./footer";
import { Link, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assets/css/products.css";
import { userContext } from "../App"; // ← Get logged-in user

const Display = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useContext(userContext); // ← From login context
  const navigate = useNavigate();

  const userId = sessionStorage.getItem("userId"); // fallback

  // ✅ FETCH PRODUCTS
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/addproducts`)
      .then((res) => setProducts(res.data))
      .catch((err) => {
        console.error("Fetch products error:", err);
        toast.error("Failed to load products");
      });
  }, []);

  // ✅ AOS
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  // ✅ ADD TO CART API
  const handleAddToCart = async (product) => {
    const finalUserId = user?._id || user?.userId || userId;

    if (!finalUserId) {
      toast.error("Please login first!");
      navigate("/login");
      return;
    }

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/cart`, {
        userId: finalUserId,
        product,
      });

      toast.success(`${product.pname} added to cart!`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
      });
      console.log("Cart API response:", res.data);
    } catch (err) {
      console.error("Add to cart error:", err);
      toast.error(err.response?.data?.error || "Failed to add to cart");
    }
  };

  // ✅ SEARCH FILTER
  const filteredProducts = products.filter((product) =>
    product.pname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <div className="container">
        <p className="text-center p-3 product-title" data-aos="fade-up">
          Antique Products
        </p>

        {/* SEARCH BAR */}
        <div className="row justify-content-center mb-4">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control search-bar"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* PRODUCT GRID */}
        <div className="row" data-aos="fade-up">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => {
              const imagePath = product.image || "https://via.placeholder.com/300x200?text=No+Image";

              return (
                <div className="col-md-4 mb-4" key={product._id}>
                  <div className="card h-100 shadow product-card">
                    <div className="image-container">
                      <img
                        src={imagePath}
                        alt={product.pname}
                        className="card-img-top product-image"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/300x200?text=Image+Error";
                        }}
                      />
                    </div>

                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title product-name">{product.pname}</h5>
                      <p className="card-text product-price">Rs - {product.price}</p>

                      <div className="mt-auto">
                        <button
                          className="btn add-to-cart-btn w-100 mb-2"
                          onClick={() => handleAddToCart(product)}
                        >
                          Add to Cart
                        </button>

                        <Link to={`/hi/${product._id}`} className="btn view-details-btn w-100">
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center mt-4">No products found.</p>
          )}
        </div>
      </div>

      <Footer />
      <ToastContainer />
    </>
  );
};

export default Display;