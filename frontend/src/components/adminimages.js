
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import '../assets/css/products.css';
import AOS from 'aos';
import { Link } from 'react-router-dom';

const Adminimages = () => {
    const [file, setFile] = useState(null);
    const [uploadedImages, setUploadedImages] = useState([]);
    const [banners, setBanners] = useState([]);

    // Fetch banner images from an API
    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/bannerimg`); // API endpoint to fetch banner images
                const data = await response.json();
                setBanners(data);
            } catch (error) {
                console.error('Error fetching banner images:', error);
            }
        };

        fetchBanners();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            alert("Please select an image file to upload.");
            return;
        }

        const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!validImageTypes.includes(file.type)) {
            alert("Invalid file type. Please upload an image (JPEG, PNG, GIF, WEBP).");
            return;
        }

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/bannerimg`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 201) {
                alert("Banner image uploaded successfully!");
                setFile(null);
                setUploadedImages((prevImages) => [...prevImages, response.data.data]); // Update image list
            } else {
                alert("Failed to upload image. Please try again.");
            }
        } catch (err) {
            console.error("Error uploading image:", err);
            alert("An error occurred while uploading the image. Please check the console for details.");
        }
    };


    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this banner?")) {
            try {
                const response = await axios.delete(`${process.env.REACT_APP_API_URL}/bannerimg/${id}`);
                if (response.status === 200) {
                    alert("Banner deleted successfully!");
                    setBanners((prevBanners) => prevBanners.filter((banner) => banner._id !== id)); // Update the list after deletion
                } else {
                    alert("Failed to delete the banner. Please try again.");
                }
            } catch (err) {
                console.error("Error deleting banner:", err);
                alert("An error occurred while deleting the banner.");
            }
        }
    };


    useEffect(() => {
        AOS.init();
        AOS.refresh();
    }, []);

    return (
      
        <>
            <div className="admin-container">
                {/* Sidebar */}
                {/* <div className="sidebar">
                    <Link to="/dash"  ><h2 className='sidebar-title'>Dashboard</h2></Link>
                    <ul className="sidebar-menu">
                        <li>
                            <Link to="/displayproduct">
                                <i className="fas fa-box"></i> Products
                            </Link>
                        </li>
                        <li>
                            <Link to="/admincustomers">
                                <i className="fas fa-users"></i> Users
                            </Link>
                        </li>
                        <li>
                            <Link to="/adminpending">
                                <i className="fas fa-truck"></i> Pending Orders
                            </Link>
                        </li>
                        <li>
                            <Link to="/adminorders">
                                <i className="fa-solid fa-pen-to-square"></i> Orders
                            </Link>
                        </li>
                        <li>
                            <Link to="/addproducts">
                                <i className="fa-solid fa-cart-plus"></i> Add Product
                            </Link>
                        </li>
                        <li>
                            <Link to="/adminimages" className="active">
                                <i className="fa-regular fa-image"></i> Add Images
                            </Link>
                        </li>
                    </ul>
                </div> */}
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
                    <div className="banner-images">
                        <div className="container add-products-container">
                            <h1 className="text-center add-products-title mb-3" data-aos="fade-up">
                                Banner Image
                            </h1>
                            {/* Form to Upload Banner Image */}
                            <Form onSubmit={handleSubmit} data-aos="fade-up">
                                <Form.Group className="mb-3" controlId="ImageUpload">
                                    <Form.Control
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setFile(e.target.files[0])}
                                        required
                                    />
                                </Form.Group>
                                <Button type="submit" className="product-btn">
                                    Upload Image
                                </Button>
                            </Form>

                            {/* Display Uploaded Images */}
                            <div className="uploaded-images mt-4">
                                {banners.length > 0 ? (
                                    <table className="table table-hover text-center">
                                        <thead>
                                            <tr>
                                                <th>S.no</th>
                                                <th>Image</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {banners.map((banner, index) => (
                                                <tr key={banner._id}>
                                                    <td>{index + 1}</td>
                                                    <td>
                                                        <img
                                                            src={`http://localhost:3001${banner.path}`}
                                                            alt={`Banner ${index + 1}`}
                                                            className="banner-thumbnail"
                                                            style={{ width: "100px", height: "auto", borderRadius: "5px" }}
                                                        />
                                                    </td>
                                                    <td>
                                                        <button
                                                            className="btn btn-danger"
                                                            onClick={() => handleDelete(banner._id)}
                                                        >
                                                            Remove
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p className="text-center mt-3">No banner images uploaded yet.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>


    );
};

export default Adminimages;
