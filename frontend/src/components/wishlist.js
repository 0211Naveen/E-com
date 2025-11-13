
// import React from 'react';
// import { Link } from 'react-router-dom';
// import '../assets/css/products.css';
// import Footer from './footer';
// import Navbar from './navbar';

// const Wishlist = ({ wishlist }) => {
//     if (wishlist.length === 0) {
//         // return <p>Your wishlist is empty.</p>;
//     }

//     // ✅ Use .env variable for base URL
//     const BASE_URL = process.env.REACT_APP_API_URL;

//     // ✅ Generate image path safely
//     const getImagePath = (image) => {
//         return image
//             ? `${BASE_URL}/uploads/${image.split('\\').pop()}`
//             : `${BASE_URL}/uploads/placeholder.png`;
//     };

//     return (
//         <>
//             <Navbar />
//             <div className="container mt-4">
//                 <h1 className="text-center wishlist-title">Wishlist</h1>
//                 <div className="row">
//                     {wishlist.map((item) => (
//                         <div className="col-md-4" key={item._id}>
//                             <div className="card h-100">
//                                 <img
//                                     src={getImagePath(item.image)}
//                                     // alt={item.pname}
//                                     onError={(e) => {
//                                         e.target.src = `${BASE_URL}/uploads/placeholder.png`;
//                                     }}
//                                     className="img-fluid rounded"
//                                 />
//                                 <div className="card-body">
//                                     <h5>{item.pname}</h5>
//                                     <p>Price: Rs. {item.price}</p>
//                                     <Link
//                                         to={`/hi/${item._id}`}
//                                         className="btn product-btn"
//                                     >
//                                         View Product
//                                     </Link>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             <Footer />
//         </>
//     );
// };

// export default Wishlist;


import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/products.css';
import Footer from './footer';
import Navbar from './navbar';

const Wishlist = ({ wishlist }) => {
  if (wishlist.length === 0) {
    return (
      <>
        <Navbar />
        <div className="container text-center mt-5">
          <h2 className="wishlist-title">Your wishlist is empty 🕊️</h2>
          <p className="text-muted">Start adding some favorite antique items!</p>
          <Link to="/displayproduct" className="btn btn-dark mt-3">
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
      <div className="container mt-4">
        <h1 className="text-center wishlist-title mb-4">My Wishlist ❤️</h1>

        <div className="row">
          {wishlist.map((item) => {
            // ✅ Use Cloudinary image directly
            const imagePath = item.image
              ? item.image // full Cloudinary URL
              : 'https://via.placeholder.com/300x200?text=No+Image';

            return (
              <div className="col-md-4 mb-4" key={item._id}>
                <div className="card h-100 shadow-sm border-0 rounded-3">
                  <div className="image-container">
                    <img
                      src={imagePath}
                      alt={item.pname}
                      className="img-fluid rounded-top"
                      style={{
                        width: '100%',
                        height: '250px',
                        objectFit: 'cover',
                      }}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x200?text=Image+Error';
                      }}
                    />
                  </div>
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{item.pname}</h5>
                    <p className="card-text text-muted">Price: Rs. {item.price}</p>

                    <div className="mt-auto">
                      <Link
                        to={`/hi/${item._id}`}
                        className="btn product-btn w-100"
                      >
                        View Product
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Wishlist;

