// import React, { useEffect, useState, useContext } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { Card, Row, Col } from 'react-bootstrap';
// import Navbar from './navbar';
// import Footer from './footer';
// import { userContext } from '../App';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import '../assets/css/products.css';

// const ProductDetails = ({ addToCart, addToWishlist, cart }) => {
//   const { id } = useParams(); // Product ID from URL
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [reviewText, setReviewText] = useState('');
//   const [reviews, setReviews] = useState([]);
//   const { user } = useContext(userContext);

//   const navigate = useNavigate();

//   // ✅ Fetch product details
//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_API_URL}/addproducts/${id}`);
//         setProduct(response.data);

//         const existingCartItem = cart.find(item => item._id === response.data._id);
//         if (existingCartItem) setQuantity(existingCartItem.quantity);
//       } catch (err) {
//         console.error('Error fetching product:', err);
//         setError('Could not load product details.');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProduct();
//   }, [id, cart]);

//   // ✅ Fetch product reviews
//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_API_URL}/review/${id}`);
//         const reviewArray = Array.isArray(response.data)
//           ? response.data
//           : response.data.reviews || [];
//         setReviews(reviewArray);
//       } catch (err) {
//         console.error('Error fetching reviews:', err);
//         setReviews([]);
//       }
//     };
//     fetchReviews();
//   }, [id]);

//   // ✅ Add to Cart
//   const handleAddToCart = () => {
//     addToCart({ ...product, quantity });
//     toast.success(`${quantity} x ${product.pname} added to cart!`, {
//       position: "top-center",
//       autoClose: 2000,
//       hideProgressBar: true,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: false
//     });
//   };

//   // ✅ Add to Wishlist
//   const handleAddToWishlist = () => {
//     addToWishlist(product);
//     toast.info(`${product.pname} added to wishlist!`);
//   };

//   // ✅ Submit Review
//   const handleSubmitReview = async (e) => {
//     e.preventDefault();

//     if (!reviewText.trim()) return toast.error("Review cannot be empty!");
//     if (!user) return toast.error("Please log in to submit a review.");

//     try {
//       await axios.post(`${process.env.REACT_APP_API_URL}/review`, {
//         productId: id,
//         review: reviewText,
//         userName: user.name,
//       });

//       setReviewText('');
//       toast.success("Review submitted successfully!");

//       const response = await axios.get(`${process.env.REACT_APP_API_URL}/review/${id}`);
//       const reviewArray = Array.isArray(response.data)
//         ? response.data
//         : response.data.reviews || [];
//       setReviews(reviewArray);
//     } catch (err) {
//       console.error("Error submitting review:", err);
//       toast.error("Failed to submit review.");
//     }
//   };

//   // ✅ Delete Review
//   const handleDeleteReview = async (reviewId) => {
//     try {
//       const response = await axios.delete(`${process.env.REACT_APP_API_URL}/review/${reviewId}`);
//       if (response.status === 200) {
//         setReviews(reviews.filter((rev) => rev._id !== reviewId));
//         toast.success('Review deleted successfully!');
//       }
//     } catch (err) {
//       console.error('Error deleting review:', err);
//       toast.error('Failed to delete review.');
//     }
//   };

//   if (loading) return <p>Loading product details...</p>;
//   if (error) return <p className="text-danger text-center">{error}</p>;
//   if (!product) return <p>Product not found.</p>;

//   const { pname, price, desc, image } = product;

//   // ✅ Fix for Cloudinary images
//   const imagePath = image
//     ? image // full Cloudinary URL directly from DB
//     : 'https://via.placeholder.com/400x300?text=No+Image';

//   return (
//     <>
//       <Navbar />
//       <div className="desc-page">
//         <div className="container py-5">
//           <Row className="align-items-center justify-content-center">
//             <Col md={6} className="mb-3">
//               <Card className="shadow-lg border-0 rounded-3 overflow-hidden">
//                 <Card.Img
//                   variant="top"
//                   src={imagePath}
//                   alt={pname}
//                   className="img-fluid"
//                   onError={(e) => {
//                     e.target.src = 'https://via.placeholder.com/400x300?text=Image+Error';
//                   }}
//                 />
//               </Card>
//             </Col>
//             <Col md={5}>
//               <Card className="p-4 shadow-lg border-0 rounded-3 bg-light">
//                 <Card.Body>
//                   <Card.Title className="fw-bold fs-4">{pname}</Card.Title>
//                   <Card.Text className="fs-5 text-muted">
//                     Price: <strong>Rs. {price}</strong>
//                   </Card.Text>
//                   <Card.Text className="fs-6 text-secondary">{desc}</Card.Text>

//                   <div className="d-flex gap-3 mt-3">
//                     <button
//                       className="btn btn-dark px-4 py-2 rounded-pill"
//                       onClick={handleAddToCart}
//                     >
//                       Add to Cart
//                     </button>

//                     <button
//                       className="btn btn-outline-danger px-4 py-2 rounded-pill d-flex align-items-center gap-2"
//                       onClick={handleAddToWishlist}
//                     >
//                       <i className="fa-solid fa-heart fs-5"></i> Wishlist
//                     </button>
//                   </div>
//                 </Card.Body>
//               </Card>
//             </Col>
//           </Row>
//         </div>

//         {/* 📝 Reviews Section */}
//         <div className="container py-4">
//           <h3 className="Review-title text-dark fw-bold">Write a Review</h3>
//           <form onSubmit={handleSubmitReview} className="form mt-3">
//             <div className="mb-3">
//               <textarea
//                 className="form-control shadow-sm p-3"
//                 rows="4"
//                 placeholder="Share your experience with this product..."
//                 value={reviewText}
//                 onChange={(e) => setReviewText(e.target.value)}
//                 required
//                 style={{ borderRadius: "8px", resize: "none" }}
//               />
//             </div>
//             <button type="submit" className="btn btn-success px-4 py-2 rounded-pill shadow">
//               Submit Review
//             </button>
//           </form>

//           <h3 className="mt-5 mb-3 Customer-Reviews-title text-dark fw-bold">
//             Customer Reviews
//           </h3>

//           {reviews.length > 0 ? (
//             <ul className="list-group mb-4">
//               {reviews.map((rev) => (
//                 <li
//                   key={rev._id}
//                   className="list-group-item border-0 shadow-sm rounded p-3 mb-3 d-flex align-items-start justify-content-between bg-light"
//                 >
//                   <div className="w-100">
//                     <div className="d-flex flex-column flex-md-row align-items-start">
//                       <strong className="text-primary">{rev.userName}:</strong>
//                       <p className="ms-md-3 text-dark">{rev.review || "No review content"}</p>
//                     </div>
//                     <span className="text-muted small">
//                       {rev.createdAt
//                         ? new Date(rev.createdAt).toLocaleString()
//                         : "Unknown Date"}
//                     </span>
//                   </div>

//                   {user?.name === rev.userName && (
//                     <button
//                       className="btn btn-danger d-flex align-items-center justify-content-center shadow"
//                       onClick={() => handleDeleteReview(rev._id)}
//                       title="Delete Review"
//                       style={{
//                         borderRadius: "50%",
//                         padding: "0.6rem",
//                         minWidth: "40px",
//                         minHeight: "40px",
//                       }}
//                     >
//                       <i className="fa-solid fa-trash"></i>
//                     </button>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p className="text-muted text-center fs-5">
//               No reviews yet. Be the first to leave one! 😊
//             </p>
//           )}
//         </div>
//       </div>
//       <Footer />
//       <ToastContainer />
//     </>
//   );
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

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { user } = useContext(userContext);
  const navigate = useNavigate();

  // ⭐ Fetch Product
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/addproducts/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error("Error:", err));
  }, [id]);

  // ⭐ Fetch Reviews
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/review/${id}`)
      .then(res => {
        const list = Array.isArray(res.data) ? res.data : res.data.reviews || [];
        setReviews(list);
      })
      .catch(() => setReviews([]));
  }, [id]);

  // ⭐ Add To Cart API
  const handleAddToCart = () => {
    const userId = sessionStorage.getItem("userId");

    if (!userId) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    axios.post(`${process.env.REACT_APP_API_URL}/cart`, {
      userId,
      product,
    })
      .then(() => {
        toast.success("Added to cart!");
      })
      .catch(err => console.log(err));
  };

  // ⭐ Submit Review
  const handleSubmitReview = (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Login required!");
      return;
    }

    axios.post(`${process.env.REACT_APP_API_URL}/review`, {
      productId: id,
      userName: user.name,
      review: reviewText,
    })
      .then(() => {
        setReviewText("");
        toast.success("Review submitted!");

        axios.get(`${process.env.REACT_APP_API_URL}/review/${id}`)
          .then(res => setReviews(res.data));
      })
      .catch(() => toast.error("Error submitting review"));
  };

  // ⭐ Delete Review
  const handleDeleteReview = (reviewId) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/review/${reviewId}`)
      .then(() => {
        setReviews(reviews.filter(r => r._id !== reviewId));
        toast.success("Review deleted");
      })
      .catch(() => toast.error("Error deleting review"));
  };

  if (!product) return <p>Loading...</p>;

  const { pname, price, desc, image } = product;

  // CLOUDINARY IMAGE (DIRECT URL)
  const imagePath = image ? image : "https://via.placeholder.com/400x300";

  return (
    <>
      <Navbar />

      <div className="container py-5">
        <Row className="align-items-center">
          <Col md={6}>
            <Card className="shadow-lg border-0">
              <img src={imagePath} className="img-fluid" alt={pname} />
            </Card>
          </Col>

          <Col md={6}>
            <Card className="p-4 shadow-lg border-0 bg-light">
              <h2 className="fw-bold">{pname}</h2>
              <h4 className="text-muted">Rs. {price}</h4>
              <p className="text-secondary">{desc}</p>

              <button className="btn btn-dark px-4 py-2 mt-3" onClick={handleAddToCart}>
                Add to Cart
              </button>

              <Link to="/" className="btn btn-outline-secondary px-4 py-2 mt-3 ms-3">
                Back
              </Link>
            </Card>
          </Col>
        </Row>
      </div>

      {/* ⭐ Reviews Section */}
      <div className="container py-4">
        <h3>Write a Review</h3>
        
        <form onSubmit={handleSubmitReview}>
          <textarea
            className="form-control"
            rows="3"
            placeholder="Your review..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            required
          ></textarea>

          <button className="btn btn-success mt-3">Submit</button>
        </form>

        <h3 className="mt-4">Customer Reviews</h3>

        {reviews.length > 0 ? (
          <ul className="list-group mt-3">
            {reviews.map((rev) => (
              <li className="list-group-item d-flex justify-content-between" key={rev._id}>
                <div>
                  <strong>{rev.userName}</strong>
                  <p>{rev.review}</p>
                </div>

                {user?.name === rev.userName && (
                  <button onClick={() => handleDeleteReview(rev._id)} className="btn btn-danger">
                    Delete
                  </button>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>

      <Footer />
      <ToastContainer />
    </>
  );
};

export default ProductDetails;
