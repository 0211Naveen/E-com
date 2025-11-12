import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../assets/css/products.css';
import '../assets/css/sidebar.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
import '../assets/css/ad.css';

const Storedisplay = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3001/addproducts")
            .then(response => setProducts(response.data))
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
        AOS.refresh();
    }, []);

    // edit products
    const handleEdit = (productId) => {
        navigate(`/storeedit/${productId}`); // Navigate to edit form
    };

    // delete products
    const handleDelete = (productId) => {
        axios.delete(`http://localhost:3001/addproducts/${productId}`)
            .then(() => {
                alert("Product deleted successfully!");
                setProducts(products.filter(product => product._id !== productId)); // Update UI after deletion
            })
            .catch(err => console.error("Failed to delete product:", err));
    };

    const logout = () => {

        sessionStorage.setItem("isLoggedIn", "false"); // Set logged-in status to false
        navigate('/storelog'); // Redirect to login page or any other page
    };

    const login = () => {

        navigate('/storelog'); // Redirect to login page or any other page
    };

    return (

        <>
            <div className="admin-container">

                {/* side-bar */}

                    <div className="sidebar" style={{ padding: '10px', height: '100vh' }}>
                                <Link to="/show">
                                    <h2 className='sidebar-title' style={{ marginBottom: '20px', fontSize: '1.5rem' }}>Store</h2>
                                </Link>
                
                                <ul className="sidebar-menu" style={{ padding: '0', margin: '0' }}>
                                    <li style={{ margin: '10px 0' }}>
                                        <Link to="/show" style={{ padding: '8px 10px', display: 'block' }}>
                                            <i className="fas fa-tachometer-alt" style={{ marginRight: '8px' }}></i>
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li style={{ margin: '10px 0' }}>
                                        <div style={{ padding: '8px 10px', display: 'block' }}>
                                            <i className="fas fa-sign-in-alt" style={{ marginRight: '8px', fontSize: '1.5rem', cursor: 'pointer' }}></i>
                                            <button onClick={login} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'white', fontSize: '1.2rem' }}>
                                                Login
                                            </button>
                
                                        </div>
                                    </li>
                                    <li style={{ margin: '10px 0' }}>
                                        <div style={{ padding: '8px 10px', display: 'flex', alignItems: 'center' }}>
                                            <i className="fas fa-sign-out-alt" style={{ marginRight: '8px', fontSize: '1.5rem', cursor: 'pointer' }}></i>
                                            <button onClick={logout} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'white', fontSize: '1.2rem' }}>
                                                Logout
                                            </button>
                                        </div>
                                    </li>
                                </ul>
                            </div>


                {/* main-content */}

                <div className="main-content">
                    <div className="container">
                        <p className="text-center p-3 product-title" data-aos="fade-up">Products</p>
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
                                    {products.map((product) => {
                                        const imagePath = product.image
                                            ? `http://localhost:3001/uploads/${product.image.split('\\').pop()}`
                                            : 'http://localhost:3001/uploads/placeholder.png';

                                        return (
                                            <tr key={product._id}>
                                                <td>
                                                    <img
                                                        src={imagePath}
                                                        alt={product.pname}
                                                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                                    />
                                                </td>
                                                <td>{product.pname}</td>
                                                <td>{product.price}</td>
                                                <td>
                                                    <button
                                                        className="btn product-btn"
                                                        onClick={() => handleEdit(product._id)}>
                                                        Edit
                                                    </button>
                                                </td>
                                                <td>
                                                    <button
                                                        className="btn btn-danger"
                                                        onClick={() => handleDelete(product._id)}>
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>



            </div>







        </>

    );
};

export default Storedisplay;
