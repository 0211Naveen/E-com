


// import React from 'react';
// import { Link } from 'react-router-dom';
// import '../assets/css/products.css';
// import Footer from './footer';
// import Navbar from './navbar'

// const Wishlist = ({ wishlist }) => {
//     if (wishlist.length === 0) {
//         // return <p>Your wishlist is empty.</p>;
//     }

//     const getImagePath = (image) => {
//         return image 
//             ? `http://localhost:3001/uploads/${image.split('\\').pop()}`
//             : 'http://localhost:3001/uploads/placeholder.png';
//     };

//     return (
//         <>
//        <Navbar />
//         <div className="container mt-4">
        
//             <h1 className='text-center wishlist-title'>Wishlist</h1>
//             <div className="row">
//                 {wishlist.map((item) => (
//                     <div className="col-md-4" key={item._id}>
//                         <div className="card h-75">
//                             <img 
//                                 src={getImagePath(item.image)} 
//                                 alt={item.pname} 
//                                 onError={(e) => { e.target.src = 'http://localhost:3001/uploads/placeholder.png'; }} 
//                             />
//                             <div className="card-body">
//                                 <h5>{item.pname}</h5>
//                                 <p>Price: Rs. {item.price}</p>
//                                 <Link to={`/hi/${item._id}`} className="btn product-btn">View Product</Link>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>

//         <Footer/>
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
        // return <p>Your wishlist is empty.</p>;
    }

    // ✅ Use .env variable for base URL
    const BASE_URL = process.env.REACT_APP_API_URL;

    // ✅ Generate image path safely
    const getImagePath = (image) => {
        return image
            ? `${BASE_URL}/uploads/${image.split('\\').pop()}`
            : `${BASE_URL}/uploads/placeholder.png`;
    };

    return (
        <>
            <Navbar />
            <div className="container mt-4">
                <h1 className="text-center wishlist-title">Wishlist</h1>
                <div className="row">
                    {wishlist.map((item) => (
                        <div className="col-md-4" key={item._id}>
                            <div className="card h-100">
                                <img
                                    src={getImagePath(item.image)}
                                    // alt={item.pname}
                                    onError={(e) => {
                                        e.target.src = `${BASE_URL}/uploads/placeholder.png`;
                                    }}
                                    className="img-fluid rounded"
                                />
                                <div className="card-body">
                                    <h5>{item.pname}</h5>
                                    <p>Price: Rs. {item.price}</p>
                                    <Link
                                        to={`/hi/${item._id}`}
                                        className="btn product-btn"
                                    >
                                        View Product
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Wishlist;
