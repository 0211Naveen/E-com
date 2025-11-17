// import React, { useEffect, useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';
// import '../assets/css/products.css';
// import '../assets/css/sidebar.css';
// import '../assets/css/ad.css';
// import AOS from 'aos';
// import 'aos/dist/aos.css';

// const Admindisplay = () => {
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const navigate = useNavigate();

//     // ✅ Fetch products from backend
//     useEffect(() => {
//         axios
//             .get(`${process.env.REACT_APP_API_URL}/addproducts`)
//             .then((response) => setProducts(response.data))
//             .catch((err) => console.error("Error fetching products:", err))
//             .finally(() => setLoading(false));
//     }, []);

//     // ✅ AOS Animation setup
//     useEffect(() => {
//         AOS.init({ duration: 1000, once: true });
//         AOS.refresh();
//     }, []);

//     // ✅ Edit Product
//     const handleEdit = (productId) => {
//         navigate(`/admineditproducts/${productId}`);
//     };

//     // ✅ Delete Product
//     const handleDelete = (productId) => {
//         axios
//             .delete(`${process.env.REACT_APP_API_URL}/addproducts/${productId}`)
//             .then(() => {
//                 alert("Product deleted successfully!");
//                 setProducts(products.filter((product) => product._id !== productId));
//             })
//             .catch((err) => {
//                 console.error("Failed to delete product:", err);
//                 alert("Error deleting product. Please try again.");
//             });
//     };

//     return (
//         <>
//             <div className="admin-container">
//                 {/* Sidebar */}


//                 <div className="sidebar" style={{ padding: '10px', height: '100vh' }}>
//                     <Link to="/dash">
//                         <h2 className='sidebar-title' style={{ marginBottom: '20px', fontSize: '1.5rem' }}>Dashboard</h2>
//                     </Link>

//                     <ul className="sidebar-menu" style={{ padding: '0', margin: '0' }}>
//                         <li style={{ margin: '10px 0' }}>
//                             <Link to="/displayproduct" style={{ padding: '8px 10px', display: 'block' }}>
//                                 <i className="fas fa-box" style={{ marginRight: '8px' }}></i> Products
//                             </Link>
//                         </li>
//                         <li style={{ margin: '10px 0' }}>
//                             <Link to="/admincustomers" style={{ padding: '8px 10px', display: 'block' }}>
//                                 <i className="fas fa-users" style={{ marginRight: '8px' }}></i> Users
//                             </Link>
//                         </li>
//                         <li style={{ margin: '10px 0' }}>
//                             <Link to="/adminpending" style={{ padding: '8px 10px', display: 'block' }}>
//                                 <i className="fas fa-truck" style={{ marginRight: '8px' }}></i> Pending Orders
//                             </Link>
//                         </li>
//                         <li style={{ margin: '10px 0' }}>
//                             <Link to="/adminorders" style={{ padding: '8px 10px', display: 'block' }}>
//                                 <i className="fa-solid fa-pen-to-square" style={{ marginRight: '8px' }}></i> Orders
//                             </Link>
//                         </li>
//                         <li style={{ margin: '10px 0' }}>
//                             <Link to="/addproducts" style={{ padding: '8px 10px', display: 'block' }}>
//                                 <i className="fa-solid fa-cart-plus" style={{ marginRight: '8px' }}></i> Add Product
//                             </Link>
//                         </li>
//                         <li style={{ margin: '10px 0' }}>
//                             <Link to="/adminimages" style={{ padding: '8px 10px', display: 'block' }}>
//                                 <i className="fa-regular fa-image" style={{ marginRight: '8px' }}></i> Add Images
//                             </Link>
//                         </li>
//                         <li style={{ margin: '10px 0' }}>
//                             <Link to="/group" style={{ padding: '8px 10px', display: 'block' }}>
//                                 <i className="fas fa-shield-alt" style={{ marginRight: '8px' }}></i> Privileges
//                             </Link>
//                         </li>
//                     </ul>
//                 </div>

//                 {/* Main Content */}
//                 <div className="main-content">
//                     <div className="container">
//                         <p className="text-center p-3 product-title" data-aos="fade-up">
//                             Products
//                         </p>

//                         {loading ? (
//                             <p className="text-center">Loading products...</p>
//                         ) : (
//                             <div className="table-responsive" data-aos="fade-up">
//                                 <table className="table table-hover text-center">
//                                     <thead className="thead-light">
//                                         <tr>
//                                             <th>Image</th>
//                                             <th>Product Name</th>
//                                             <th>Price (Rs)</th>
//                                             <th colSpan="2">Actions</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {products.length > 0 ? (
//                                             products.map((product) => {
//                                                 const imagePath = product.image
//                                                     ? product.image // ✅ Cloudinary image URL
//                                                     : 'https://via.placeholder.com/50?text=No+Image';

//                                                 return (
//                                                     <tr key={product._id}>
//                                                         <td>
//                                                             <img
//                                                                 src={imagePath}
//                                                                 alt={product.pname}
//                                                                 style={{
//                                                                     width: '50px',
//                                                                     height: '50px',
//                                                                     objectFit: 'cover',
//                                                                     borderRadius: '6px',
//                                                                 }}
//                                                                 onError={(e) =>
//                                                                 (e.target.src =
//                                                                     'https://via.placeholder.com/50?text=Image+Error')
//                                                                 }
//                                                             />
//                                                         </td>
//                                                         <td>{product.pname}</td>
//                                                         <td>{product.price}</td>
//                                                         <td>
//                                                             <button
//                                                                 className="btn product-btn"
//                                                                 onClick={() => handleEdit(product._id)}
//                                                             >
//                                                                 Edit
//                                                             </button>
//                                                         </td>
//                                                         <td>
//                                                             <button
//                                                                 className="btn btn-danger"
//                                                                 onClick={() => handleDelete(product._id)}
//                                                             >
//                                                                 Delete
//                                                             </button>
//                                                         </td>
//                                                     </tr>
//                                                 );
//                                             })
//                                         ) : (
//                                             <tr>
//                                                 <td colSpan="5">No products available</td>
//                                             </tr>
//                                         )}
//                                     </tbody>
//                                 </table>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default Admindisplay;


import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../assets/css/products.css';
import '../assets/css/sidebar.css';
import '../assets/css/ad.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Admindisplay = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // ✅ Fetch products
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/addproducts`)
            .then((response) => setProducts(response.data))
            .catch((err) => console.error("Error fetching products:", err))
            .finally(() => setLoading(false));
    }, []);

    // ✅ AOS Animation setup
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
        AOS.refresh();
    }, []);

    // ✅ Edit Product
    const handleEdit = (productId) => {
        navigate(`/admineditproducts/${productId}`);
    };

    // ✅ Delete Product with YES/NO Confirmation
    const handleDelete = (productId) => {
        if (!window.confirm("Are you sure you want to delete this product?")) {
            return; // ❌ Cancel delete
        }

        axios
            .delete(`${process.env.REACT_APP_API_URL}/addproducts/${productId}`)
            .then(() => {
                alert("Product deleted successfully!");
                setProducts(products.filter((product) => product._id !== productId));
            })
            .catch((err) => {
                console.error("Failed to delete product:", err);
                alert("Error deleting product. Please try again.");
            });
    };

    return (
        <>
            <div className="admin-container">
                {/* Sidebar */}
                <div className="sidebar" style={{ padding: '10px', height: '100vh' }}>
                    <Link to="/dash">
                        <h2 className='sidebar-title' style={{ marginBottom: '20px', fontSize: '1.5rem' }}>Dashboard</h2>
                    </Link>

                    <ul className="sidebar-menu" style={{ padding: '0', margin: '0' }}>
                        <li style={{ margin: '10px 0' }}>
                            <Link to="/displayproduct" style={{ padding: '8px 10px', display: 'block' }}>
                                <i className="fas fa-box" style={{ marginRight: '8px' }}></i> Products
                            </Link>
                        </li>
                        <li style={{ margin: '10px 0' }}>
                            <Link to="/admincustomers" style={{ padding: '8px 10px', display: 'block' }}>
                                <i className="fas fa-users" style={{ marginRight: '8px' }}></i> Users
                            </Link>
                        </li>
                        <li style={{ margin: '10px 0' }}>
                            <Link to="/adminpending" style={{ padding: '8px 10px', display: 'block' }}>
                                <i className="fas fa-truck" style={{ marginRight: '8px' }}></i> Pending Orders
                            </Link>
                        </li>
                        <li style={{ margin: '10px 0' }}>
                            <Link to="/adminorders" style={{ padding: '8px 10px', display: 'block' }}>
                                <i className="fa-solid fa-pen-to-square" style={{ marginRight: '8px' }}></i> Orders
                            </Link>
                        </li>
                        <li style={{ margin: '10px 0' }}>
                            <Link to="/addproducts" style={{ padding: '8px 10px', display: 'block' }}>
                                <i className="fa-solid fa-cart-plus" style={{ marginRight: '8px' }}></i> Add Product
                            </Link>
                        </li>
                        <li style={{ margin: '10px 0' }}>
                            <Link to="/adminimages" style={{ padding: '8px 10px', display: 'block' }}>
                                <i className="fa-regular fa-image" style={{ marginRight: '8px' }}></i> Add Images
                            </Link>
                        </li>
                        <li style={{ margin: '10px 0' }}>
                            <Link to="/group" style={{ padding: '8px 10px', display: 'block' }}>
                                <i className="fas fa-shield-alt" style={{ marginRight: '8px' }}></i> Privileges
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Main Content */}
                <div className="main-content">
                    <div className="container">
                        <p className="text-center p-3 product-title" data-aos="fade-up">
                            Products
                        </p>

                        {loading ? (
                            <p className="text-center">Loading products...</p>
                        ) : (
                            <div className="table-responsive" data-aos="fade-up">
                                <table className="table table-hover text-center">
                                    <thead className="thead-light">
                                        <tr>
                                            <th>Image</th>
                                            <th>Product Name</th>
                                            <th>Price (Rs)</th>
                                            <th colSpan="2">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.length > 0 ? (
                                            products.map((product) => {
                                                const imagePath = product.image
                                                    ? product.image
                                                    : 'https://via.placeholder.com/50?text=No+Image';

                                                return (
                                                    <tr key={product._id}>
                                                        <td>
                                                            <img
                                                                src={imagePath}
                                                                alt={product.pname}
                                                                style={{
                                                                    width: '50px',
                                                                    height: '50px',
                                                                    objectFit: 'cover',
                                                                    borderRadius: '6px',
                                                                }}
                                                                onError={(e) =>
                                                                    (e.target.src =
                                                                        'https://via.placeholder.com/50?text=Image+Error')
                                                                }
                                                            />
                                                        </td>
                                                        <td>{product.pname}</td>
                                                        <td>{product.price}</td>

                                                        {/* Edit Button */}
                                                        <td>
                                                            <button
                                                                className="btn product-btn"
                                                                onClick={() => handleEdit(product._id)}
                                                            >
                                                                Edit
                                                            </button>
                                                        </td>

                                                        {/* Delete Button */}
                                                        <td>
                                                            <button
                                                                className="btn btn-danger"
                                                                onClick={() => handleDelete(product._id)}
                                                            >
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        ) : (
                                            <tr>
                                                <td colSpan="5">No products available</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Admindisplay;
