
// import React, { useEffect, useState, useContext } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import axios from 'axios';
// import { Card, Row, Col } from 'react-bootstrap';
// import '../assets/css/products.css';
// import Footer from './footer';
// import Navbar from './navbar';
// import { useNavigate } from "react-router-dom";
// import { userContext } from '../App';
// import { ToastContainer, toast } from 'react-toastify'; // Import Toastify
// import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
// import '../assets/css/products.css';


// const ProductDetails = ({ addToCart, addToWishlist, cart }) => {
//     const { id } = useParams(); // Product ID from URL
//     const [product, setProduct] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [quantity, setQuantity] = useState(1);
//     const [reviewText, setReviewText] = useState(''); // Renamed from `review` to avoid conflict
//     const [reviews, setReviews] = useState([]); // Store fetched reviews
//     const { user } = useContext(userContext); // Access user context for logged-in user info

//     const navigate = useNavigate();

//     // Fetch product by ID 
//     useEffect(() => {
//         const fetchProduct = async () => {
//             try {
//                 const response = await axios.get(`${process.env.REACT_APP_API_URL}/addproducts/${id}`);
//                 setProduct(response.data);
//                 const existingCartItem = cart.find(item => item._id === response.data._id);
//                 if (existingCartItem) {
//                     setQuantity(existingCartItem.quantity);
//                 }
//             } catch (err) {
//                 console.error('Error fetching product:', err);
//                 setError('Could not load product details.');
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchProduct();
//     }, [id, cart]);

//     // Fetch reviews for the product


//     useEffect(() => {
//     const fetchReviews = async () => {
//         try {
//             const response = await axios.get(`${process.env.REACT_APP_API_URL}/review/${id}`);
//             console.log("Fetched reviews:", response.data);

//             const reviewArray = Array.isArray(response.data) 
//                 ? response.data 
//                 : (response.data.reviews || []);

//             setReviews(reviewArray);
//         } catch (err) {
//             console.error('Error fetching reviews:', err);
//             setReviews([]);
//         }
//     };
//     fetchReviews();
// }, [id]);

//     // Handle adding product to cart
//     const handleAddToCart = () => {
//         addToCart({ ...product, quantity });
//         // ✅ Show toast notification instead of alert
//         toast.success(`${quantity} x ${product.pname} added to cart!`, {
//             position: "top-center",  // Centered notification
//             autoClose: 2000,         // Hide after 2 seconds
//             hideProgressBar: true,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: false
//         });
//     };

//     // Handle adding product to wishlist
//     const handleAddToWishlist = () => {
//         addToWishlist(product); // Add product to wishlist
//         alert(`${product.pname} has been added to your wishlist!`);
//     };

//     const handleSubmitReview = async (e) => {
//     e.preventDefault();

//     if (!reviewText.trim()) {
//         toast.error("Review cannot be empty!");
//         return;
//     }

//     if (!user) {
//         toast.error("Please log in to submit a review.");
//         return;
//     }

//     try {
//         await axios.post(`${process.env.REACT_APP_API_URL}/review`, {
//             productId: id,
//             review: reviewText,
//             userName: user.name,
//         });

//         setReviewText('');
//         toast.success("Review submitted successfully!");

//         // Re-fetch reviews to ensure consistency
//         const response = await axios.get(`${process.env.REACT_APP_API_URL}/review/${id}`);
//         const reviewArray = Array.isArray(response.data) ? response.data : response.data.reviews || [];
//         setReviews(reviewArray);

//     } catch (err) {
//         console.error("Error submitting review:", err);
//         toast.error("Failed to submit review.");
//     }
// };

//     // Handle deleting a review
//     const handleDeleteReview = async (reviewId) => {
//         try {
//             const response = await axios.delete(`${process.env.REACT_APP_API_URL}/review/${reviewId}`);
//             if (response.status === 200) {
//                 setReviews(reviews.filter((rev) => rev._id !== reviewId)); // Remove deleted review from state
//                 alert('Review deleted successfully!');
//             }
//         } catch (err) {
//             console.error('Error deleting review:', err);
//             alert('Failed to delete review.');
//         }
//     };



//     if (loading) return <p>Loading product details...</p>;
    

//     // 🛑 Add this check:
//     if (!product) return <p>Product not found.</p>;


//     const { pname, price, desc, image } = product;
//     const imagePath = image
//         ? `${process.env.REACT_APP_API_URL}/uploads/${image.split('\\').pop()}`
//         : `${process.env.REACT_APP_API_URL}/uploads/placeholder.png`;

//     return (
//         <>
//             <Navbar />
//             <div className='desc-page'>

//                 <div className="container py-5">
//                     <Row className="align-items-center justify-content-center">
//                         <Col md={6} className="mb-3">
//                             <Card className="shadow-lg border-0 rounded-3 overflow-hidden">
//                                 <Card.Img variant="top" src={imagePath} alt={pname} className="img-fluid" />
//                             </Card>
//                         </Col>
//                         <Col md={5}>
//                             <Card className="p-4 shadow-lg border-0 rounded-3 bg-light">
//                                 <Card.Body>
//                                     <Card.Title className="fw-bold fs-4">{pname}</Card.Title>
//                                     <Card.Text className="fs-5 text-muted">Price: <strong>Rs. {price}</strong></Card.Text>
//                                     <Card.Text className="fs-6 text-secondary">{desc}</Card.Text>
//                                     <div className="d-flex gap-3 mt-3">
//                                         <button className="btn btn-dark px-4 py-2 rounded-pill" onClick={handleAddToCart}>
//                                             Add to Cart
//                                         </button>
//                                         <Link to="/wishlist" className="btn btn-outline-danger px-4 py-2 rounded-pill d-flex align-items-center gap-2" onClick={handleAddToWishlist}>
//                                             <i className="fa-solid fa-heart fs-5"></i> Wishlist
//                                         </Link>
//                                     </div>
//                                 </Card.Body>
//                             </Card>
//                         </Col>
//                     </Row>
//                 </div>


//                 <div className="container py-4">
//                     {/* Write a Review Section */}
//                     <h3 className="Review-title text-dark fw-bold">Write a Review</h3>
//                     <form onSubmit={handleSubmitReview} className="form mt-3">
//                         <div className="mb-3">
//                             <textarea
//                                 className="form-control shadow-sm p-3"
//                                 id="review"
//                                 name="review"
//                                 rows="4"
//                                 placeholder="Share your experience with this product..."
//                                 value={reviewText}
//                                 onChange={(e) => setReviewText(e.target.value)}
//                                 required
//                                 style={{ borderRadius: "8px", resize: "none" }}
//                             />
//                         </div>
//                         <button type="submit" className="btn btn-success px-4 py-2 rounded-pill shadow">
//                             Submit Review
//                         </button>
//                     </form>

//                     {/* Customer Reviews Section */}
//                     <h3 className="mt-5 mb-3 Customer-Reviews-title text-dark fw-bold">Customer Reviews</h3>
                


//                     {reviews.length > 0 ? (
//                         <ul className="list-group mb-4">
//                             {reviews.map((rev) => (
//                                 <li key={rev._id} className="list-group-item border-0 shadow-sm rounded p-3 mb-3 d-flex align-items-start justify-content-between bg-light">
//                                     <div className="w-100">
//                                         <div className="d-flex flex-column flex-md-row align-items-start">
//                                             <strong className="text-primary">{rev.userName}:</strong>
//                                             <p className="ms-md-3 text-dark">{rev.review || "No review content available"}</p>
//                                         </div>
//                                         <span className="text-muted small">{rev.createdAt ? new Date(rev.createdAt).toLocaleString() : "Unknown Date"}</span>
//                                     </div>
//                                     {user?.name === rev.userName && (
//                                         <button
//                                             className="btn btn-danger d-flex align-items-center justify-content-center shadow"
//                                             onClick={() => handleDeleteReview(rev._id)}
//                                             title="Delete Review"
//                                             style={{ borderRadius: "50%", padding: "0.6rem", minWidth: "40px", minHeight: "40px" }}
//                                         >
//                                             <i className="fa-solid fa-trash"></i>
//                                         </button>
//                                     )}
//                                 </li>
//                             ))}
//                         </ul>
//                     ) : (
//                         <p className="text-muted text-center fs-5">No reviews yet. Be the first to leave a review! 😊</p>
//                     )}



//                 </div>
//             </div>
//             <Footer />

//             {/* Toast Notification Container */}
//             <ToastContainer />
//         </>
//     );
// };

// export default ProductDetails;




import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, Row, Col } from 'react-bootstrap';
import Navbar from './navbar';
import Footer from './footer';
import { userContext } from '../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../assets/css/products.css';

const ProductDetails = ({ addToCart, addToWishlist, cart }) => {
  const { id } = useParams(); // Product ID from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [reviewText, setReviewText] = useState('');
  const [reviews, setReviews] = useState([]);
  const { user } = useContext(userContext);

  const navigate = useNavigate();

  // ✅ Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/addproducts/${id}`);
        setProduct(response.data);

        const existingCartItem = cart.find(item => item._id === response.data._id);
        if (existingCartItem) setQuantity(existingCartItem.quantity);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Could not load product details.');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, cart]);

  // ✅ Fetch product reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/review/${id}`);
        const reviewArray = Array.isArray(response.data)
          ? response.data
          : response.data.reviews || [];
        setReviews(reviewArray);
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setReviews([]);
      }
    };
    fetchReviews();
  }, [id]);

  // ✅ Add to Cart
  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    toast.success(`${quantity} x ${product.pname} added to cart!`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false
    });
  };

  // ✅ Add to Wishlist
  const handleAddToWishlist = () => {
    addToWishlist(product);
    toast.info(`${product.pname} added to wishlist!`);
  };

  // ✅ Submit Review
  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!reviewText.trim()) return toast.error("Review cannot be empty!");
    if (!user) return toast.error("Please log in to submit a review.");

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/review`, {
        productId: id,
        review: reviewText,
        userName: user.name,
      });

      setReviewText('');
      toast.success("Review submitted successfully!");

      const response = await axios.get(`${process.env.REACT_APP_API_URL}/review/${id}`);
      const reviewArray = Array.isArray(response.data)
        ? response.data
        : response.data.reviews || [];
      setReviews(reviewArray);
    } catch (err) {
      console.error("Error submitting review:", err);
      toast.error("Failed to submit review.");
    }
  };

  // ✅ Delete Review
  const handleDeleteReview = async (reviewId) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/review/${reviewId}`);
      if (response.status === 200) {
        setReviews(reviews.filter((rev) => rev._id !== reviewId));
        toast.success('Review deleted successfully!');
      }
    } catch (err) {
      console.error('Error deleting review:', err);
      toast.error('Failed to delete review.');
    }
  };

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p className="text-danger text-center">{error}</p>;
  if (!product) return <p>Product not found.</p>;

  const { pname, price, desc, image } = product;

  // ✅ Fix for Cloudinary images
  const imagePath = image
    ? image // full Cloudinary URL directly from DB
    : 'https://via.placeholder.com/400x300?text=No+Image';

  return (
    <>
      <Navbar />
      <div className="desc-page">
        <div className="container py-5">
          <Row className="align-items-center justify-content-center">
            <Col md={6} className="mb-3">
              <Card className="shadow-lg border-0 rounded-3 overflow-hidden">
                <Card.Img
                  variant="top"
                  src={imagePath}
                  alt={pname}
                  className="img-fluid"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x300?text=Image+Error';
                  }}
                />
              </Card>
            </Col>
            <Col md={5}>
              <Card className="p-4 shadow-lg border-0 rounded-3 bg-light">
                <Card.Body>
                  <Card.Title className="fw-bold fs-4">{pname}</Card.Title>
                  <Card.Text className="fs-5 text-muted">
                    Price: <strong>Rs. {price}</strong>
                  </Card.Text>
                  <Card.Text className="fs-6 text-secondary">{desc}</Card.Text>

                  <div className="d-flex gap-3 mt-3">
                    <button
                      className="btn btn-dark px-4 py-2 rounded-pill"
                      onClick={handleAddToCart}
                    >
                      Add to Cart
                    </button>

                    <button
                      className="btn btn-outline-danger px-4 py-2 rounded-pill d-flex align-items-center gap-2"
                      onClick={handleAddToWishlist}
                    >
                      <i className="fa-solid fa-heart fs-5"></i> Wishlist
                    </button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>

        {/* 📝 Reviews Section */}
        <div className="container py-4">
          <h3 className="Review-title text-dark fw-bold">Write a Review</h3>
          <form onSubmit={handleSubmitReview} className="form mt-3">
            <div className="mb-3">
              <textarea
                className="form-control shadow-sm p-3"
                rows="4"
                placeholder="Share your experience with this product..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                required
                style={{ borderRadius: "8px", resize: "none" }}
              />
            </div>
            <button type="submit" className="btn btn-success px-4 py-2 rounded-pill shadow">
              Submit Review
            </button>
          </form>

          <h3 className="mt-5 mb-3 Customer-Reviews-title text-dark fw-bold">
            Customer Reviews
          </h3>

          {reviews.length > 0 ? (
            <ul className="list-group mb-4">
              {reviews.map((rev) => (
                <li
                  key={rev._id}
                  className="list-group-item border-0 shadow-sm rounded p-3 mb-3 d-flex align-items-start justify-content-between bg-light"
                >
                  <div className="w-100">
                    <div className="d-flex flex-column flex-md-row align-items-start">
                      <strong className="text-primary">{rev.userName}:</strong>
                      <p className="ms-md-3 text-dark">{rev.review || "No review content"}</p>
                    </div>
                    <span className="text-muted small">
                      {rev.createdAt
                        ? new Date(rev.createdAt).toLocaleString()
                        : "Unknown Date"}
                    </span>
                  </div>

                  {user?.name === rev.userName && (
                    <button
                      className="btn btn-danger d-flex align-items-center justify-content-center shadow"
                      onClick={() => handleDeleteReview(rev._id)}
                      title="Delete Review"
                      style={{
                        borderRadius: "50%",
                        padding: "0.6rem",
                        minWidth: "40px",
                        minHeight: "40px",
                      }}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted text-center fs-5">
              No reviews yet. Be the first to leave one! 😊
            </p>
          )}
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default ProductDetails;
