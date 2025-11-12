
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import '../assets/css/products.css';
import AOS from 'aos';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Storeimage = () => {
    const [file, setFile] = useState(null);
    const [uploadedImages, setUploadedImages] = useState([]);
    const [banners, setBanners] = useState([]);
    const navigate = useNavigate();

    // Fetch banner images from an API
    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const response = await fetch('http://localhost:3001/bannerimg'); // API endpoint to fetch banner images
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
            const response = await axios.post("http://localhost:3001/bannerimg", formData, {
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
                const response = await axios.delete(`http://localhost:3001/bannerimg/${id}`);
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

export default Storeimage;
