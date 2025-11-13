

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Navbar from './navbar';
// import Footer from './footer';
// import { Link, useNavigate } from "react-router-dom";
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import { ToastContainer, toast } from 'react-toastify'; // Import Toastify
// import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
// import '../assets/css/products.css';

// const Display = ({ addToCart }) => {
//     const [products, setProducts] = useState([]);
//     const [searchTerm, setSearchTerm] = useState("");

//     const navigate = useNavigate();

//     useEffect(() => {
//     axios.get(`${process.env.REACT_APP_API_URL}/addproducts`)
//         .then(response => setProducts(response.data))
//         .catch(err => console.log(err));
// }, []);


//     useEffect(() => {
//         AOS.init({ duration: 1000, once: true });
//         AOS.refresh();
//     }, []);

//     const handleAddToCart = (product) => {
//         addToCart(product);

//         // ✅ Show toast notification instead of alert
//         toast.success(`${product.pname} added to cart!`, {
//             position: "top-center", // Centered notification
//             autoClose: 2000, // Hide after 2 seconds
//             hideProgressBar: true,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: false,
//         });
        
//     };

//     const filteredProducts = products.filter(product =>
//         product.pname.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     return (
//         <>
//             <Navbar />

//             <div className="container">
//                 <p className="text-center p-3 " id="product-title" data-aos="fade-up">Antique Products</p>

//                 {/* Search Bar */}
//                 <div className="row justify-content-center mb-4">
//                     <div className="col-md-6">
//                         <input 
//                             type="text" 
//                             className="form-control search-bar" 
//                             placeholder="🔍 Search for products..." 
//                             value={searchTerm} 
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                         />
//                     </div>
//                 </div>

//                 <div className="row" data-aos="fade-up">
//                     {filteredProducts.length > 0 ? (
//                         filteredProducts.map(product => {
                           

//                             const imagePath = product.image 
//     ? `${process.env.REACT_APP_API_URL}/uploads/${product.image.split('\\').pop()}`
//     : `${process.env.REACT_APP_API_URL}/uploads/placeholder.png`;

//                             return (
//                                 <div className="col-md-4 mb-4" key={product._id}>
//                                     <div className="card h-100 shadow product-card">
//                                         <div className="image-container">
//                                             <img 
//                                                 src={imagePath} 
//                                                 alt={product.pname} 
//                                                 className="card-img-top product-image"
//                                             />
//                                         </div>
//                                         <div className="card-body d-flex flex-column">
//                                             <h5 className="card-title product-name">{product.pname}</h5>
//                                             <p className="card-text product-price">Rs - {product.price}</p>

//                                             <div className="mt-auto">
//                                                 <button 
//                                                     className="btn add-to-cart-btn w-100 mb-2" 
//                                                     onClick={() => handleAddToCart(product)}
//                                                 >
//                                                     Add to Cart
//                                                 </button>
//                                                 <Link 
//                                                     to={`/hi/${product._id}`} 
//                                                     className="btn view-details-btn w-100"
//                                                 >
//                                                     View Details
//                                                 </Link>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             );
//                         })
//                     ) : (
//                         <p className="text-center mt-4">No products found.</p>
//                     )}
//                 </div>
//             </div>

//             <Footer />

//             {/* Toast Notification Container */}
//             <ToastContainer />
//         </>
//     );
// };

// export default Display;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './navbar';
import Footer from './footer';
import { Link, useNavigate } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../assets/css/products.css';

const Display = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // ✅ Fetch products from backend
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/addproducts`)
      .then(response => setProducts(response.data))
      .catch(err => console.log("Error fetching products:", err));
  }, []);

  // ✅ Initialize AOS animation
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    AOS.refresh();
  }, []);

  // ✅ Add to cart with Toast Notification
  const handleAddToCart = (product) => {
    addToCart(product);

    toast.success(`${product.pname} added to cart!`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
    });
  };

  // ✅ Filter by search term
  const filteredProducts = products.filter(product =>
    product.pname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <div className="container">
        <p className="text-center p-3 product-title" data-aos="fade-up">
          Antique Products
        </p>

        {/* 🔍 Search Bar */}
        <div className="row justify-content-center mb-4">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control search-bar"
              placeholder="🔍 Search for products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* 🖼️ Product Grid */}
        <div className="row" data-aos="fade-up">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => {
              // ✅ Cloudinary image URL (directly stored in DB)
              const imagePath = product.image
                ? product.image // full Cloudinary URL
                : 'https://via.placeholder.com/300x200?text=No+Image';

              return (
                <div className="col-md-4 mb-4" key={product._id}>
                  <div className="card h-100 shadow product-card">
                    <div className="image-container">
                      <img
                        src={imagePath}
                        alt={product.pname}
                        className="card-img-top product-image"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/300x200?text=Image+Error';
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

                        <Link
                          to={`/hi/${product._id}`}
                          className="btn view-details-btn w-100"
                        >
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

      {/* Toast Notification Container */}
      <ToastContainer />
    </>
  );
};

export default Display;
