

// import React, { useEffect, useState, useContext } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Card, Row, Col } from "react-bootstrap";
// import Navbar from "./navbar";
// import Footer from "./footer";
// import { userContext } from "../App";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "../assets/css/products.css";

// const ProductDetails = () => {
//   const { id } = useParams();               // product id
//   const [product, setProduct] = useState(null);
//   const [reviews, setReviews] = useState([]);
//   const [reviewText, setReviewText] = useState("");
//   const { user } = useContext(userContext); // <-- user from context
//   const navigate = useNavigate();

//   // ---------- 1. FETCH PRODUCT ----------
//   useEffect(() => {
//     axios
//       .get(`${process.env.REACT_APP_API_URL}/addproducts/${id}`)
//       .then((res) => setProduct(res.data))
//       .catch((err) => console.error("Product fetch error:", err));
//   }, [id]);

//   // ---------- 2. FETCH REVIEWS ----------
//   useEffect(() => {
//     axios
//       .get(`${process.env.REACT_APP_API_URL}/review/${id}`)
//       .then((res) => {
//         const list = Array.isArray(res.data) ? res.data : res.data.reviews || [];
//         setReviews(list);
//       })
//       .catch(() => setReviews([]));
//   }, [id]);

//   // ---------- 3. ADD TO CART ----------
//   const handleAddToCart = () => {
//     // ---- a) GET USER ID (context → sessionStorage fallback) ----
//     const contextUserId = user?.userId || user?._id;          // adjust field name
//     const sessionUserId = sessionStorage.getItem("userId");
//     const finalUserId = contextUserId || sessionUserId;

//     console.log("=== ADD TO CART DEBUG ===");
//     console.log("context user →", user);
//     console.log("session userId →", sessionUserId);
//     console.log("finalUserId used →", finalUserId);
//     console.log("product →", product);

//     if (!finalUserId) {
//       toast.error("Please login first!");
//       navigate("/login");
//       return;
//     }

//     if (!product?._id) {
//       toast.error("Product not loaded yet");
//       return;
//     }

//     // ---- b) CALL API ----
//     axios
//       .post(`${process.env.REACT_APP_API_URL}/cart`, {
//         userId: finalUserId,
//         product,                         // whole product object (pname, price, image, _id)
//       })
//       .then((res) => {
//         console.log("Cart API success →", res.data);
//         toast.success(res.data.message || "Added to cart!");
//       })
//       .catch((err) => {
//         console.error("Cart API error →", err.response?.data || err);
//         toast.error(err.response?.data?.error || "Failed to add to cart");
//       });
//   };

//   // ---------- 4. SUBMIT REVIEW (unchanged) ----------
//   const handleSubmitReview = (e) => {
//     e.preventDefault();
//     if (!user) {
//       toast.error("Login required!");
//       return;
//     }
//     axios
//       .post(`${process.env.REACT_APP_API_URL}/review`, {
//         productId: id,
//         userName: user.name,
//         review: reviewText,
//       })
//       .then(() => {
//         setReviewText("");
//         toast.success("Review submitted!");
//         return axios.get(`${process.env.REACT_APP_API_URL}/review/${id}`);
//       })
//       .then((res) => setReviews(res.data))
//       .catch(() => toast.error("Error submitting review"));
//   };

//   // ---------- 5. DELETE REVIEW ----------
//   const handleDeleteReview = (reviewId) => {
//     axios
//       .delete(`${process.env.REACT_APP_API_URL}/review/${reviewId}`)
//       .then(() => {
//         setReviews((prev) => prev.filter((r) => r._id !== reviewId));
//         toast.success("Review deleted");
//       })
//       .catch(() => toast.error("Error deleting review"));
//   };

//   if (!product) return <p className="text-center">Loading...</p>;

//   const { pname, price, desc, image } = product;
//   const imagePath = image || "https://via.placeholder.com/400x300";

//   return (
//     <>
//       <Navbar />
//       <div className="container py-5">
//         <Row className="align-items-center">
//           <Col md={6}>
//             <Card className="shadow-lg border-0">
//               <img src={imagePath} className="img-fluid" alt={pname} />
//             </Card>
//           </Col>

//           <Col md={6}>
//             <Card className="p-4 shadow-lg border-0 bg-light">
//               <h2 className="fw-bold">{pname}</h2>
//               <h4 className="text-muted">Rs. {price}</h4>
//               <p className="text-secondary">{desc}</p>

//               <button
//                 className="add-to-cart-btn px-4 py-2 rounded-pill"
//                 onClick={handleAddToCart}
//               >
//                 Add to Cart
//               </button>

//               <Link to="/display" className="btn btn-dark px-4 py-2 rounded-pill mt-2">
//                 Back
//               </Link>
//             </Card>
//           </Col>
//         </Row>
//       </div>

//       {/* ---------- REVIEWS ---------- */}
//       <div className="container py-4">
//         <h3>Write a Review</h3>
//         <form onSubmit={handleSubmitReview}>
//           <textarea
//             className="form-control"
//             rows="3"
//             placeholder="Your review..."
//             value={reviewText}
//             onChange={(e) => setReviewText(e.target.value)}
//             required
//           />
//           <button className="btn btn-success mt-3">Submit</button>
//         </form>

//         <h3 className="mt-4">Customer Reviews</h3>
//         {reviews.length > 0 ? (
//           <ul className="list-group mt-3">
//             {reviews.map((rev) => (
//               <li
//                 className="list-group-item d-flex justify-content-between"
//                 key={rev._id}
//               >
//                 <div>
//                   <strong>{rev.userName}</strong>
//                   <p>{rev.review}</p>
//                 </div>

//                 {user?.name === rev.userName && (
//                   <button
//                     onClick={() => handleDeleteReview(rev._id)}
//                     className="btn btn-danger btn-sm"
//                   >
//                     Delete
//                   </button>
//                 )}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No reviews yet.</p>
//         )}
//       </div>

//       <Footer />
//       <ToastContainer />
//     </>
//   );
// };

// export default ProductDetails;




// // src/pages/ProductDetails.jsx
// import React, { useEffect, useState, useContext } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Card, Row, Col, Button } from "react-bootstrap";
// import Navbar from "./navbar";
// import Footer from "./footer";
// import { userContext } from "../App";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "../assets/css/products.css";

// const ProductDetails = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [reviews, setReviews] = useState([]);
//   const [reviewText, setReviewText] = useState("");
//   const { user } = useContext(userContext);
//   const navigate = useNavigate();

//   const userId = user?._id || user?.userId || sessionStorage.getItem("userId");

//   // FETCH PRODUCT
//   useEffect(() => {
//     axios.get(`${process.env.REACT_APP_API_URL}/addproducts/${id}`)
//       .then(res => setProduct(res.data))
//       .catch(() => toast.error("Product not found"));
//   }, [id]);

//   // FETCH REVIEWS
//   useEffect(() => {
//     axios.get(`${process.env.REACT_APP_API_URL}/review/${id}`)
//       .then(res => setReviews(Array.isArray(res.data) ? res.data : res.data.reviews || []))
//       .catch(() => setReviews([]));
//   }, [id]);

//   // ADD TO CART
//   const handleAddToCart = () => {
//     if (!userId) { toast.error("Login first!"); navigate("/login"); return; }

//     axios.post(`${process.env.REACT_APP_API_URL}/cart`, { userId, product })
//       .then(() => toast.success("Added to cart!"))
//       .catch(() => toast.error("Failed to add"));
//   };

//   // ADD TO WISHLIST (API)
//   const handleAddToWishlist = () => {
//     if (!userId) { toast.error("Login first!"); navigate("/login"); return; }

//     axios.post(`${process.env.REACT_APP_API_URL}/wishlist`, { userId, product })
//       .then(() => toast.success(`${product.pname} added to wishlist!`))
//       .catch(err => {
//         const msg = err.response?.data?.error || "Failed to add";
//         toast.error(msg);
//       });
//   };

//   // SUBMIT REVIEW
//   const handleSubmitReview = (e) => {
//     e.preventDefault();
//     if (!user) { toast.error("Login required"); return; }

//     axios.post(`${process.env.REACT_APP_API_URL}/review`, {
//       productId: id,
//       userName: user.name,
//       review: reviewText,
//     })
//     .then(() => {
//       setReviewText("");
//       toast.success("Review submitted!");
//       return axios.get(`${process.env.REACT_APP_API_URL}/review/${id}`);
//     })
//     .then(res => setReviews(Array.isArray(res.data) ? res.data : res.data.reviews || []))
//     .catch(() => toast.error("Review failed"));
//   };

//   // DELETE REVIEW
//   const handleDeleteReview = (reviewId) => {
//     axios.delete(`${process.env.REACT_APP_API_URL}/review/${reviewId}`)
//       .then(() => {
//         setReviews(prev => prev.filter(r => r._id !== reviewId));
//         toast.success("Review deleted");
//       })
//       .catch(() => toast.error("Delete failed"));
//   };

//   if (!product) return <p className="text-center py-5">Loading...</p>;

//   const { pname, price, desc, image } = product;
//   const imagePath = image || "https://via.placeholder.com/400x300";

//   return (
//     <>
//       <Navbar />
//       <div className="container py-5">
//         <Row className="g-4 align-items-start">
//           <Col md={6}>
//             <Card className="border-0 shadow-sm overflow-hidden">
//               <img src={imagePath} className="img-fluid" alt={pname} />
//             </Card>
//           </Col>

//           <Col md={6}>
//             <Card className="p-4 border-0 shadow-sm bg-light h-100">
//               <h2 className="fw-bold mb-2">{pname}</h2>
//               <h4 className="text-success mb-3">₹{price}</h4>
//               <p className="text-secondary mb-4">{desc}</p>

//               <div className="d-flex gap-2 flex-wrap">
//                 <Button
//                   className="px-4 py-2 rounded-pill"
//                   onClick={handleAddToCart}
//                 >
//                   Add to Cart
//                 </Button>

//                 <Button
//                   variant="outline-danger"
//                   className="px-4 py-2 rounded-pill d-flex align-items-center gap-2"
//                   onClick={handleAddToWishlist}
//                 >
//                   Wishlist
//                 </Button>
//               </div>

//               <Link to="/display" className="btn btn-dark px-4 py-2 rounded-pill mt-3 w-100">
//                 Back to Products
//               </Link>
//             </Card>
//           </Col>
//         </Row>

//         {/* REVIEWS */}
//         <div className="mt-5">
//           <h3 className="mb-3">Write a Review</h3>
//           <form onSubmit={handleSubmitReview} className="mb-4">
//             <textarea
//               className="form-control mb-2"
//               rows="3"
//               placeholder="Share your thoughts..."
//               value={reviewText}
//               onChange={(e) => setReviewText(e.target.value)}
//               required
//             />
//             <Button type="submit" className="px-4">Submit</Button>
//           </form>

//           <h3>Customer Reviews</h3>
//           {reviews.length > 0 ? (
//             <div className="list-group">
//               {reviews.map(rev => (
//                 <div key={rev._id} className="list-group-item d-flex justify-content-between align-items-start p-3">
//                   <div>
//                     <strong>{rev.userName}</strong>
//                     <p className="mb-1">{rev.review}</p>
//                     <small className="text-muted">
//                       {new Date(rev.createdAt).toLocaleString()}
//                     </small>
//                   </div>
//                   {user?.name === rev.userName && (
//                     <Button size="sm" variant="danger" onClick={() => handleDeleteReview(rev._id)}>
//                       Delete
//                     </Button>
//                   )}
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-muted">No reviews yet.</p>
//           )}
//         </div>
//       </div>

//       <Footer />
//       <ToastContainer />
//     </>
//   );
// };

// export default ProductDetails;



// // src/pages/ProductDetails.jsx
// import React, { useEffect, useState, useContext } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Card, Row, Col, Button } from "react-bootstrap";
// import Navbar from "./navbar";
// import Footer from "./footer";
// import { userContext } from "../App";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "../assets/css/products.css";

// const ProductDetails = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [reviews, setReviews] = useState([]);
//   const [reviewText, setReviewText] = useState("");
//   const { user } = useContext(userContext);
//   const navigate = useNavigate();

//   const userId = user?._id || user?.userId || sessionStorage.getItem("userId");

//   // FETCH PRODUCT
//   useEffect(() => {
//     axios.get(`${process.env.REACT_APP_API_URL}/addproducts/${id}`)
//       .then(res => setProduct(res.data))
//       .catch(() => toast.error("Product not found"));
//   }, [id]);

//   // FETCH REVIEWS
//   useEffect(() => {
//     axios.get(`${process.env.REACT_APP_API_URL}/review/${id}`)
//       .then(res => setReviews(Array.isArray(res.data) ? res.data : res.data.reviews || []))
//       .catch(() => setReviews([]));
//   }, [id]);

//   // ADD TO CART
//   const handleAddToCart = () => {
//     if (!userId) { toast.error("Login first!"); navigate("/login"); return; }

//     axios.post(`${process.env.REACT_APP_API_URL}/cart`, { userId, product })
//       .then(() => toast.success("Added to cart!"))
//       .catch(() => toast.error("Failed to add"));
//   };

//   // ADD TO WISHLIST (API)
//   const handleAddToWishlist = () => {
//     if (!userId) { toast.error("Login first!"); navigate("/login"); return; }

//     axios.post(`${process.env.REACT_APP_API_URL}/wishlist`, { userId, product })
//       .then(() => toast.success(`${product.pname} added to wishlist!`))
//       .catch(err => {
//         const msg = err.response?.data?.error || "Failed to add";
//         toast.error(msg);
//       });
//   };

//   // SUBMIT REVIEW
//   const handleSubmitReview = (e) => {
//     e.preventDefault();
//     if (!user) { toast.error("Login required"); return; }

//     axios.post(`${process.env.REACT_APP_API_URL}/review`, {
//       productId: id,
//       userName: user.name,
//       review: reviewText,
//     })
//     .then(() => {
//       setReviewText("");
//       toast.success("Review submitted!");
//       return axios.get(`${process.env.REACT_APP_API_URL}/review/${id}`);
//     })
//     .then(res => setReviews(Array.isArray(res.data) ? res.data : res.data.reviews || []))
//     .catch(() => toast.error("Review failed"));
//   };

//   // DELETE REVIEW
//   const handleDeleteReview = (reviewId) => {
//     axios.delete(`${process.env.REACT_APP_API_URL}/review/${reviewId}`)
//       .then(() => {
//         setReviews(prev => prev.filter(r => r._id !== reviewId));
//         toast.success("Review deleted");
//       })
//       .catch(() => toast.error("Delete failed"));
//   };

//   if (!product) return <p className="text-center py-5">Loading...</p>;

//   const { pname, price, desc, image } = product;
//   const imagePath = image || "https://via.placeholder.com/400x300";

//   return (
//     <>
//       <Navbar />
//       <div className="container py-5">
//         <Row className="g-4 align-items-start">
//           <Col md={6}>
//             <Card className="border-0 shadow-sm overflow-hidden">
//               <img src={imagePath} className="img-fluid" alt={pname} />
//             </Card>
//           </Col>

//           <Col md={6}>
//             <Card className="p-4 border-0 shadow-sm bg-light h-100">
//               <h2 className="fw-bold mb-2">{pname}</h2>
//               <h4 className="text-success mb-3">₹{price}</h4>
//               <p className="text-secondary mb-4">{desc}</p>

//               <div className="d-flex gap-2 flex-wrap">
//                 <Button
//                   className="px-4 py-2 rounded-pill"
//                   onClick={handleAddToCart}
//                 >
//                   Add to Cart
//                 </Button>

//                 <Button
//                   variant="outline-danger"
//                   className="px-4 py-2 rounded-pill d-flex align-items-center gap-2"
//                   onClick={handleAddToWishlist}
//                 >
//                   Wishlist
//                 </Button>
//               </div>

//               <Link to="/display" className="btn btn-dark px-4 py-2 rounded-pill mt-3 w-100">
//                 Back to Products
//               </Link>
//             </Card>
//           </Col>
//         </Row>

//         {/* REVIEWS */}
//         <div className="mt-5">
//           <h3 className="mb-3">Write a Review</h3>
//           <form onSubmit={handleSubmitReview} className="mb-4">
//             <textarea
//               className="form-control mb-2"
//               rows="3"
//               placeholder="Share your thoughts..."
//               value={reviewText}
//               onChange={(e) => setReviewText(e.target.value)}
//               required
//             />
//             <Button type="submit" className="px-4">Submit</Button>
//           </form>

//           <h3>Customer Reviews</h3>
//           {reviews.length > 0 ? (
//             <div className="list-group">
//               {reviews.map(rev => (
//                 <div key={rev._id} className="list-group-item d-flex justify-content-between align-items-start p-3">
//                   <div>
//                     <strong>{rev.userName}</strong>
//                     <p className="mb-1">{rev.review}</p>
//                     <small className="text-muted">
//                       {new Date(rev.createdAt).toLocaleString()}
//                     </small>
//                   </div>
//                   {user?.name === rev.userName && (
//                     <Button size="sm" variant="danger" onClick={() => handleDeleteReview(rev._id)}>
//                       Delete
//                     </Button>
//                   )}
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-muted">No reviews yet.</p>
//           )}
//         </div>
//       </div>

//       <Footer />
//       <ToastContainer />
//     </>
//   );
// };

// export default ProductDetails;


// src/pages/ProductDetails.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Row, Col, Button, Spinner } from "react-bootstrap";
import Navbar from "./navbar";
import Footer from "./footer";
import { userContext } from "../App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assets/css/products.css";

const ProductDetails = () => {
  const { id } = useParams(); // productId
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(true);
  const { user } = useContext(userContext);
  const navigate = useNavigate();

  const userId = user?._id || user?.userId || sessionStorage.getItem("userId");

  // FETCH PRODUCT
  useEffect(() => {
    if (!id) {
      toast.error("Invalid product");
      navigate("/display");
      return;
    }

    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_URL}/addproducts/${id}`)
      .then((res) => {
        if (!res.data) throw new Error("Empty response");
        setProduct(res.data);
      })
      .catch((err) => {
        console.error("Product error:", err);
        toast.error("Product not found");
        navigate("/display");
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  // FETCH REVIEWS
  useEffect(() => {
    if (!id) return;
    axios
      .get(`${process.env.REACT_APP_API_URL}/review/${id}`)
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : res.data.reviews || [];
        setReviews(data);
      })
      .catch(() => setReviews([]));
  }, [id]);

  // ADD TO CART
  const handleAddToCart = () => {
    if (!userId) return loginRedirect();
    if (!product) return;

    axios
      .post(`${process.env.REACT_APP_API_URL}/cart`, { userId, product })
      .then(() => toast.success("Added to cart!"))
      .catch(() => toast.error("Failed"));
  };

  // ADD TO WISHLIST
  const handleAddToWishlist = () => {
    if (!userId) return loginRedirect();
    if (!product) return;

    axios
      .post(`${process.env.REACT_APP_API_URL}/wishlist`, { userId, product })
      .then(() => toast.success(`${product.pname} added to wishlist!`))
      .catch((err) => toast.error(err.response?.data?.error || "Failed"));
  };

  const loginRedirect = () => {
    toast.error("Please login first!");
    navigate("/login");
  };

  // SUBMIT REVIEW
  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!user?.name) return toast.error("Login required");

    axios
      .post(`${process.env.REACT_APP_API_URL}/review`, {
        productId: id,
        userName: user.name,
        review: reviewText,
      })
      .then(() => {
        setReviewText("");
        toast.success("Review submitted!");
        return axios.get(`${process.env.REACT_APP_API_URL}/review/${id}`);
      })
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : res.data.reviews || [];
        setReviews(data);
      })
      .catch(() => toast.error("Submit failed"));
  };

  // DELETE REVIEW
  const handleDeleteReview = (reviewId) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/review/${reviewId}`)
      .then(() => {
        setReviews((prev) => prev.filter((r) => r._id !== reviewId));
        toast.success("Review deleted");
      })
      .catch(() => toast.error("Delete failed"));
  };

  // LOADING STATE
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3">Loading product...</p>
        </div>
        <Footer />
      </>
    );
  }

  // ERROR STATE (already handled in useEffect)
  if (!product) return null;

  const imagePath = product.image || "https://via.placeholder.com/400x300?text=No+Image";

  return (
    <>
      <Navbar />
      <div className="container py-5">
        <Row className="g-4">
          <Col md={6}>
            <Card className="border-0 shadow-sm overflow-hidden">
              <img
                src={imagePath}
                className="img-fluid"
                alt={product.pname}
                onError={(e) => (e.target.src = "https://via.placeholder.com/400x300?text=Error")}
              />
            </Card>
          </Col>

          <Col md={6}>
            <Card className="p-4 border-0 shadow-sm bg-light h-100">
              <h2 className="fw-bold mb-2">{product.pname}</h2>
              <h4 className="text-success mb-3">₹{product.price}</h4>
              <p className="text-secondary mb-4">{product.desc}</p>

              <div className="d-flex gap-2 flex-wrap">
                <Button className="add-to-cart-btn px-4 py-2 rounded-pill" onClick={handleAddToCart}>
                  Add to Cart
                </Button>
                <Button
                  variant="outline-danger"
                  className="px-4 py-2 rounded-pill d-flex align-items-center gap-2"
                  onClick={handleAddToWishlist}
                >
                  Wishlist
                </Button>
              </div>

              <Link to="/display" className="btn btn-dark w-100 mt-3 rounded-pill">
                Back to Products
              </Link>
            </Card>
          </Col>
        </Row>

        {/* REVIEWS */}
        <div className="mt-5">
          <h3 className="mb-3">Write a Review</h3>
          <form onSubmit={handleSubmitReview} className="mb-4">
            <textarea
              className="form-control mb-2"
              rows="3"
              placeholder="Share your thoughts..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              required
            />
            <Button type="submit" className="px-4 rounded-pill">
              Submit Review
            </Button>
          </form>

          <h3>Customer Reviews</h3>
          {/* {reviews.length > 0 ? (
            <div className="list-group">
              {reviews.map((rev) => (
                <div
                  key={rev._id}
                  className="list-group-item d-flex justify-content-between align-items-start p-3 border rounded mb-2"
                >
                  <div>
                    <strong>{rev.userName}</strong>
                    <p className="mb-1">{rev.review}</p>
                    <small className="text-muted">
                      {new Date(rev.createdAt).toLocaleString("en-IN")}
                    </small>
                  </div>
                

                  {user?.name === rev.userName && (
  <Button
    size="sm"
    variant="danger"
    onClick={() => handleDeleteReview(rev._id)}
    className="rounded-circle p-2 d-flex align-items-center justify-content-center shadow-sm"
    style={{ width: "36px", height: "36px" }}
    title="Delete Review"
  >
    <i className="fas fa-trash"></i>
  </Button>
)}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted">No reviews yet. Be the first!</p>
          )} */}

          {reviews.length > 0 ? (
  <div className="reviews-container mt-5 p-4 bg-light rounded-4 shadow-sm">
    {reviews.map((rev, index) => (
      <div
        key={rev._id}
        className={`review-item p-4 mb-3 rounded-3 border-start border-4 position-relative overflow-hidden ${
          index % 2 === 0 ? "bg-white" : "bg-soft-primary"
        }`}
        style={{
          borderLeftColor: index % 2 === 0 ? "#e3f2fd" : "#fff3e0",
          transition: "all 0.3s ease",
        }}
        data-aos="fade-up"
        data-aos-delay={index * 100}
      >
        {/* Decorative Quote */}
        <div className="position-absolute top-0 start-0 fs-1 text-primary opacity-10">
          “
        </div>

        <div className="d-flex align-items-start gap-3">
          {/* Avatar */}
          <div
            className="flex-shrink-0 d-flex align-items-center justify-content-center rounded-circle text-white fw-bold"
            style={{
              width: "48px",
              height: "48px",
              background: `linear-gradient(135deg, ${index % 2 === 0 ? "#4facfe, #00f2fe" : "#ff9a9e, #fad0c4"})`,
              fontSize: "1.1rem",
            }}
          >
            {rev.userName.charAt(0).toUpperCase()}
          </div>

          {/* Content */}
          <div className="flex-grow-1">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <h6 className="mb-0 fw-bold text-dark">{rev.userName}</h6>
              <small className="text-muted ms-2">
                {new Date(rev.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </small>
            </div>

            <p className="mb-0 text-secondary lh-lg" style={{ fontSize: "0.95rem" }}>
              {rev.review}
            </p>
          </div>

          {/* Delete Button - Only for owner */}
          {user?.name === rev.userName && (
            <Button
              size="sm"
              variant="outline-danger"
              onClick={() => handleDeleteReview(rev._id)}
              className="rounded-circle p-2 d-flex align-items-center justify-content-center shadow-sm border-0"
              style={{
                width: "38px",
                height: "38px",
                transition: "all 0.2s ease",
              }}
              title="Delete Review"
            >
              <i className="fas fa-trash-alt"></i>
            </Button>
          )}
        </div>

        {/* Bottom Wave Decoration */}
        <svg
          className="position-absolute bottom-0 end-0 opacity-5"
          width="80"
          height="30"
          viewBox="0 0 80 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 15 Q20 0, 40 15 T80 15"
            stroke={index % 2 === 0 ? "#4facfe" : "#ff9a9e"}
            strokeWidth="3"
            fill="none"
          />
        </svg>
      </div>
    ))}
  </div>
) : (
  <div className="text-center py-5">
    <i className="fas fa-comment-slash text-muted fs-1 mb-3 d-block"></i>
    <p className="text-muted fs-5 fw-medium">No reviews yet. Be the first to share your experience!</p>
    <div className="mt-3">
      <i className="fas fa-star text-warning"></i>
      <i className="fas fa-star text-warning"></i>
      <i className="fas fa-star text-warning"></i>
      <i className="fas fa-star text-warning"></i>
      <i className="fas fa-star text-warning"></i>
    </div>
  </div>
)}
        </div>
      </div>

      <Footer />
      <ToastContainer position="top-center" />
    </>
  );
};

export default ProductDetails;