// import React, { useState, useEffect } from 'react';
// import '../assets/css/dash.css';
// import '../assets/css/ad.css';
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';

// const Group = () => {
//     // States for toggle buttons, with default values from sessionStorage if available
//     const [productStatus, setProductStatus] = useState(() => JSON.parse(sessionStorage.getItem('productStatus')) || false);
//     const [userStatus, setUserStatus] = useState(() => JSON.parse(sessionStorage.getItem('userStatus')) || false);
//     const [pendingOrderStatus, setPendingOrderStatus] = useState(() => JSON.parse(sessionStorage.getItem('pendingOrderStatus')) || false);
//     const [orderStatus, setOrderStatus] = useState(() => JSON.parse(sessionStorage.getItem('orderStatus')) || false);
//     const [addProductStatus, setAddProductStatus] = useState(() => JSON.parse(sessionStorage.getItem('addProductStatus')) || false);
//     const [addImageStatus, setAddImageStatus] = useState(() => JSON.parse(sessionStorage.getItem('addImageStatus')) || false);
//    const navigate = useNavigate();



//     // Function to handle the toggle change and update status in both state and sessionStorage
//     const handleToggle = (section) => {
//         let updatedStatus;

//         // Determine the new status based on the section
//         switch (section) {
//             case 'Products':
//                 updatedStatus = !productStatus;
//                 setProductStatus(updatedStatus);
//                 sessionStorage.setItem('productStatus', JSON.stringify(updatedStatus));
//                 break;
//             case 'Users':
//                 updatedStatus = !userStatus;
//                 setUserStatus(updatedStatus);
//                 sessionStorage.setItem('userStatus', JSON.stringify(updatedStatus));
//                 break;
//             case 'Pending Orders':
//                 updatedStatus = !pendingOrderStatus;
//                 setPendingOrderStatus(updatedStatus);
//                 sessionStorage.setItem('pendingOrderStatus', JSON.stringify(updatedStatus));
//                 break;
//             case 'Orders':
//                 updatedStatus = !orderStatus;
//                 setOrderStatus(updatedStatus);
//                 sessionStorage.setItem('orderStatus', JSON.stringify(updatedStatus));
//                 break;
//             case 'Add Product':
//                 updatedStatus = !addProductStatus;
//                 setAddProductStatus(updatedStatus);
//                 sessionStorage.setItem('addProductStatus', JSON.stringify(updatedStatus));
//                 break;
//             case 'Add Images':
//                 updatedStatus = !addImageStatus;
//                 setAddImageStatus(updatedStatus);
//                 sessionStorage.setItem('addImageStatus', JSON.stringify(updatedStatus));
//                 break;
//             default:
//                 return;
//         }

//         // Send the updated status to the server
//         axios.post('http://localhost:3001/updateStatus', {
//             section,
//             status: updatedStatus
//         }).then(response => {
//             console.log('Status updated successfully');
//         }).catch(error => {
//             console.error('Error updating status', error);
//         });
//     };
//     const logout = () => {

//         sessionStorage.setItem("isLoggedIn", "false"); // Set logged-in status to false
//         navigate('/adminlog'); // Redirect to login page or any other page
//     };

//     return (
//         <>
//             <div className="sidebar" style={{ padding: '10px', height: '100vh', width: '260px' }}>
//                 <Link to="/dash">
//                     <h2 className='sidebar-title' style={{ marginBottom: '20px', fontSize: '1.5rem' }}>Dashboard</h2>
//                 </Link>

//                 <ul className="sidebar-menu" style={{ padding: '0', margin: '0' }}>
//                     <li style={{ margin: '10px 0' }}>
//                         <Link to="/displayproduct" style={{ padding: '8px 10px', display: 'block' }}>
//                             <i className="fas fa-box" style={{ marginRight: '8px' }}></i> Products
//                         </Link>
//                     </li>
//                     <li style={{ margin: '10px 0' }}>
//                         <Link to="/admincustomers" style={{ padding: '8px 10px', display: 'block' }}>
//                             <i className="fas fa-users" style={{ marginRight: '8px' }}></i> Users
//                         </Link>
//                     </li>
//                     <li style={{ margin: '10px 0' }}>
//                         <Link to="/adminpending" style={{ padding: '8px 10px', display: 'block' }}>
//                             <i className="fas fa-truck" style={{ marginRight: '8px' }}></i> Pending Orders
//                         </Link>
//                     </li>
//                     <li style={{ margin: '10px 0' }}>
//                         <Link to="/adminorders" style={{ padding: '8px 10px', display: 'block' }}>
//                             <i className="fa-solid fa-pen-to-square" style={{ marginRight: '8px' }}></i> Orders
//                         </Link>
//                     </li>
//                     <li style={{ margin: '10px 0' }}>
//                         <Link to="/addproducts" style={{ padding: '8px 10px', display: 'block' }}>
//                             <i className="fa-solid fa-cart-plus" style={{ marginRight: '8px' }}></i> Add Product
//                         </Link>
//                     </li>
//                     <li style={{ margin: '10px 0' }}>
//                         <Link to="/adminimages" style={{ padding: '8px 10px', display: 'block' }}>
//                             <i className="fa-regular fa-image" style={{ marginRight: '8px' }}></i> Add Images
//                         </Link>
//                     </li>
//                     <li style={{ margin: '10px 0' }}>
//                         <Link to="/group" style={{ padding: '8px 10px', display: 'block' }}>
//                             <i className="fas fa-shield-alt" style={{ marginRight: '8px' }}></i> Privileges
//                         </Link>
//                     </li>
//                 </ul>
//             </div>

//             <div className="main-content">
//             <div className='d-flex'>
//                         <button onClick={logout} className='btn btn-primary ms-auto'>Logout</button>
//                     </div>

//                 <h1 className="dashboard-title" data-aos="zoom-in">Store Admin Privileges</h1>
//                 <div className="dashboard-cards container">
//                     <div className="dashboard-card" data-aos="zoom-in">
//                         <h2>Products</h2>
//                         <i className="fas fa-box icon"></i>
//                         <label className="switch">
//                             <input
//                                 type="checkbox"
//                                 checked={productStatus}
//                                 onChange={() => handleToggle('Products')}
//                             />
//                             <span className="slider"></span>
//                         </label>
//                     </div>
//                     <div className="dashboard-card" data-aos="zoom-in">
//                         <h2>Users</h2>
//                         <i className="fas fa-users icon"></i>
//                         <label className="switch">
//                             <input
//                                 type="checkbox"
//                                 checked={userStatus}
//                                 onChange={() => handleToggle('Users')}
//                             />
//                             <span className="slider"></span>
//                         </label>
//                     </div>
//                     <div className="dashboard-card" data-aos="zoom-in">
//                         <h2>Pending Orders</h2>
//                         <i className="fas fa-truck icon"></i>
//                         <label className="switch">
//                             <input
//                                 type="checkbox"
//                                 checked={pendingOrderStatus}
//                                 onChange={() => handleToggle('Pending Orders')}
//                             />
//                             <span className="slider"></span>
//                         </label>
//                     </div>
//                     <div className="dashboard-card" data-aos="zoom-in">
//                         <h2>Orders</h2>
//                         <i className="fa-solid fa-pen-to-square icon"></i>
//                         <label className="switch">
//                             <input
//                                 type="checkbox"
//                                 checked={orderStatus}
//                                 onChange={() => handleToggle('Orders')}
//                             />
//                             <span className="slider"></span>
//                         </label>
//                     </div>
//                     <div className="dashboard-card" data-aos="zoom-in">
//                         <h2>Add Product</h2>
//                         <i className="fa-solid fa-cart-plus icon"></i>
//                         <label className="switch">
//                             <input
//                                 type="checkbox"
//                                 checked={addProductStatus}
//                                 onChange={() => handleToggle('Add Product')}
//                             />
//                             <span className="slider"></span>
//                         </label>
//                     </div>
//                     <div className="dashboard-card" data-aos="zoom-in">
//                         <h2>Add Images</h2>
//                         <i className="fa-regular fa-image icon"></i>
//                         <label className="switch">
//                             <input
//                                 type="checkbox"
//                                 checked={addImageStatus}
//                                 onChange={() => handleToggle('Add Images')}
//                             />
//                             <span className="slider"></span>
//                         </label>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default Group;






import React, { useState, useEffect } from 'react';
import '../assets/css/dash.css';
import '../assets/css/ad.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Group = () => {
    const [privileges, setPrivileges] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        AOS.init(); // Initialize AOS animations

        // Fetch privileges from the server
        axios.get(`${process.env.REACT_APP_API_URL}/getPrivileges`)
            .then((response) => {
                const privilegesFromServer = response.data.privileges.reduce((acc, privilege) => {
                    acc[privilege.section] = privilege.status;
                    return acc;
                }, {});
                setPrivileges(privilegesFromServer); // Set privileges based on the server response
            })
            .catch((error) => {
                console.error('Error fetching privileges:', error);
            });
    }, []);

    // Function to handle the toggle change and update status
    const handleToggle = (section) => {
        const updatedStatus = !privileges[section];

        // Optimistically update the UI
        setPrivileges((prev) => ({
            ...prev,
            [section]: updatedStatus,
        }));

        // Send the updated status to the server
        axios
            .post(`${process.env.REACT_APP_API_URL}/updateStatus`, {
                section,
                status: updatedStatus,
            })
            .then(() => {
                console.log(`Status for ${section} updated successfully`);
            })
            .catch((error) => {
                console.error('Error updating status:', error);

                // Revert UI update in case of error
                setPrivileges((prev) => ({
                    ...prev,
                    [section]: !updatedStatus,
                }));
            });
    };

    const logout = () => {
        sessionStorage.setItem("isLoggedIn", "false"); // Set logged-in status to false
        navigate('/adminlog'); // Redirect to login page or any other page
    };

    return (
        <>
            <div className="sidebar" style={{ padding: '10px', height: '100vh', width: '260px' }}>
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

            <div className="main-content">
                <div className='d-flex'>
                    <button onClick={logout} className='btn btn-primary ms-auto'>Logout</button>
                </div>

                <h1 className="dashboard-title" data-aos="zoom-in">Store Admin Privileges</h1>
                <div className="dashboard-cards container">
                    {['Products', 'Users', 'Pending Orders', 'Orders', 'Add Product', 'Add Images'].map((section) => (
                        <div className="dashboard-card" data-aos="zoom-in" key={section}>
                            <h2>{section}</h2>
                            <i className={`icon ${section === 'Products' ? 'fas fa-box' : section === 'Users' ? 'fas fa-users' : section === 'Pending Orders' ? 'fas fa-truck' : section === 'Orders' ? 'fa-solid fa-pen-to-square' : section === 'Add Product' ? 'fa-solid fa-cart-plus' : 'fa-regular fa-image'}`}></i>
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    checked={privileges[section] || false}
                                    onChange={() => handleToggle(section)}
                                />
                                <span className="slider"></span>
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Group;

































































//                                   // normal code

// // import React, { useEffect, useState } from 'react';
// // import { Link } from 'react-router-dom';
// // import '../assets/css/dash.css';
// // import '../assets/css/ad.css';
// // import AOS from 'aos';
// // import 'aos/dist/aos.css';
// // import axios from 'axios';



// // const Group = () => {
 


// //     return (
// //         <>
// //             <div className="sidebar" style={{ padding: '10px', height: '100vh', width: '260px' }}>
// //                 <Link to="/dash">
// //                     <h2 className='sidebar-title' style={{ marginBottom: '20px', fontSize: '1.5rem' }}>Dashboard</h2>
// //                 </Link>

// //                 <ul className="sidebar-menu" style={{ padding: '0', margin: '0' }}>
// //                     <li style={{ margin: '10px 0' }}>
// //                         <Link to="/displayproduct" style={{ padding: '8px 10px', display: 'block' }}>
// //                             <i className="fas fa-box" style={{ marginRight: '8px' }}></i> Products
// //                         </Link>
// //                     </li>
// //                     <li style={{ margin: '10px 0' }}>
// //                         <Link to="/admincustomers" style={{ padding: '8px 10px', display: 'block' }}>
// //                             <i className="fas fa-users" style={{ marginRight: '8px' }}></i> Users
// //                         </Link>
// //                     </li>
// //                     <li style={{ margin: '10px 0' }}>
// //                         <Link to="/adminpending" style={{ padding: '8px 10px', display: 'block' }}>
// //                             <i className="fas fa-truck" style={{ marginRight: '8px' }}></i> Pending Orders
// //                         </Link>
// //                     </li>
// //                     <li style={{ margin: '10px 0' }}>
// //                         <Link to="/adminorders" style={{ padding: '8px 10px', display: 'block' }}>
// //                             <i className="fa-solid fa-pen-to-square" style={{ marginRight: '8px' }}></i> Orders
// //                         </Link>
// //                     </li>
// //                     <li style={{ margin: '10px 0' }}>
// //                         <Link to="/addproducts" style={{ padding: '8px 10px', display: 'block' }}>
// //                             <i className="fa-solid fa-cart-plus" style={{ marginRight: '8px' }}></i> Add Product
// //                         </Link>
// //                     </li>
// //                     <li style={{ margin: '10px 0' }}>
// //                         <Link to="/adminimages" style={{ padding: '8px 10px', display: 'block' }}>
// //                             <i className="fa-regular fa-image" style={{ marginRight: '8px' }}></i> Add Images
// //                         </Link>
// //                     </li>
// //                     <li style={{ margin: '10px 0' }}>
// //                         <Link to="/group" style={{ padding: '8px 10px', display: 'block' }}>
// //                             <i className="fas fa-shield-alt" style={{ marginRight: '8px' }}></i> Privileges
// //                         </Link>
// //                     </li>
// //                 </ul>
// //             </div>


// //             <div className="main-content">
// //                 <h1 className="dashboard-title" data-aos="zoom-in">Admin Privileges</h1>
// //                 <div className="dashboard-cards container">
// //                     <div className="dashboard-card" data-aos="zoom-in">
// //                         <h2>Products</h2>
// //                         <i className="fas fa-box icon"></i>
// //                         <label className="switch">
// //                             <input type="checkbox" />
// //                             <span className="slider"></span>
// //                         </label>
// //                     </div>
// //                     <div className="dashboard-card" data-aos="zoom-in">
// //                         <h2>Users</h2>
// //                         <i className="fas fa-users icon"></i>
// //                         <label className="switch">
// //                             <input type="checkbox" />
// //                             <span className="slider"></span>
// //                         </label>
// //                     </div>
// //                     <div className="dashboard-card" data-aos="zoom-in">
// //                         <h2>Pending Orders</h2>
// //                         <i className="fas fa-truck icon"></i>
// //                         <label className="switch">
// //                             <input type="checkbox" />
// //                             <span className="slider"></span>
// //                         </label>
// //                     </div>
// //                     <div className="dashboard-card" data-aos="zoom-in">
// //                         <h2>Orders</h2>
// //                         <i className="fa-solid fa-pen-to-square icon"></i>
// //                         <label className="switch">
// //                             <input type="checkbox" />
// //                             <span className="slider"></span>
// //                         </label>
// //                     </div>
// //                     <div className="dashboard-card" data-aos="zoom-in">
// //                         <h2>Add Product</h2>
// //                         <i className="fa-solid fa-cart-plus icon"></i>
// //                         <label className="switch">
// //                             <input type="checkbox" />
// //                             <span className="slider"></span>
// //                         </label>
// //                     </div>
// //                     <div className="dashboard-card" data-aos="zoom-in">
// //                         <h2>Add Images</h2>
// //                         <i className="fa-regular fa-image icon"></i>
// //                         <label className="switch">
// //                             <input type="checkbox" />
// //                             <span className="slider"></span>
// //                         </label>
// //                     </div>
// //                 </div>
// //             </div>




// //         </>
// //     )
// // }

// // export default Group





// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import '../assets/css/dash.css';
// import '../assets/css/ad.css';
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import axios from 'axios';

// const Group = () => {
//     const [privileges, setPrivileges] = useState([]);

//     useEffect(() => {
//         // Fetch privileges from the database on component mount
//         axios.get('http://localhost:3001/getPrivileges')
//             .then(response => {
//                 setPrivileges(response.data.privileges);
//             })
//             .catch(error => {
//                 console.error('Error fetching privileges', error);
//             });
//     }, []);

//     const handleToggle = (section) => {
//         const updatedPrivileges = privileges.map(privilege => {
//             if (privilege.section === section) {
//                 const updatedStatus = !privilege.status;

//                 // Update the status in the database
//                 axios.post('http://localhost:3001/updateStatus', {
//                     section,
//                     status: updatedStatus
//                 }).then(response => {
//                     console.log('Status updated successfully');
//                 }).catch(error => {
//                     console.error('Error updating status', error);
//                 });

//                 return { ...privilege, status: updatedStatus };
//             }
//             return privilege;
//         });

//         setPrivileges(updatedPrivileges);
//     };

//     return (
//         <>
//             <div className="sidebar" style={{ padding: '10px', height: '100vh', width: '260px' }}>
//                 <Link to="/dash">
//                     <h2 className='sidebar-title' style={{ marginBottom: '20px', fontSize: '1.5rem' }}>Dashboard</h2>
//                 </Link>

//                 <ul className="sidebar-menu" style={{ padding: '0', margin: '0' }}>
//                     {/* Add links here as needed */}
//                 </ul>
//             </div>

//             <div className="main-content">
//                 <h1 className="dashboard-title" data-aos="zoom-in">Store Admin Privileges</h1>
//                 <div className="dashboard-cards container">
//                     {privileges.map(privilege => (
//                         <div className="dashboard-card" key={privilege.section} data-aos="zoom-in">
//                             <h2>{privilege.section}</h2>
//                             <i className="fas fa-box icon"></i>
//                             <label className="switch">
//                                 <input
//                                     type="checkbox"
//                                     checked={privilege.status}
//                                     onChange={() => handleToggle(privilege.section)}
//                                 />
//                                 <span className="slider"></span>
//                             </label>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </>
//     );
// };

// export default Group;


































