// import React from 'react';
// import { Link } from 'react-router-dom';
// import '../assets/css/dash.css';

// const Show = () => {
//     const visibility = JSON.parse(localStorage.getItem('dashboardVisibility')) || {};

//     // Mapping card titles to URLs
//     const cardLinks = {
//         Products: '/storedisplay',
//         Users: '/admincustomers',
//         'Pending Orders': '/adminpending',
//         Orders: '/adminorders',
//         'Add Product': '/storeaddproducts',
//         'Add Images': '/storeimgage'
//     };

//     return (

//         <div className="container py-5">
//         <h1 className='text-center fw-bold mb-4'>Store Admin </h1>
//         <div className="dashboard-cards d-flex justify-content-center flex-wrap gap-5">
//             {Object.keys(visibility).map((key) =>
//                 visibility[key] ? (
//                     <div key={key} className="dashboard-card p-4 shadow rounded text-center">
//                         <h2 className="h4 mb-3">{key}</h2>
//                         <Link to={cardLinks[key]} className="btn btn-primary">
//                         View {key}  
//                         </Link>
//                     </div>
//                 ) : null
//             )}
//         </div>
//     </div>

//     );
// };

// export default Show;





// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const Show = () => {
//     const [privileges, setPrivileges] = useState([]);

//     // Fetch privileges from the backend
//     useEffect(() => {
//         axios.get('http://localhost:3001/getPrivileges')
//             .then(response => {
//                 const filteredPrivileges = response.data.privileges.filter(privilege => privilege.status === true);
//                 setPrivileges(filteredPrivileges);
//             })
//             .catch(error => {
//                 console.error('Error fetching privileges', error);
//             });
//     }, []);

//     return (
//         <div className="main-content">
//             <h1 className="dashboard-title">Admin Privileges</h1>
//             <div className="dashboard-cards container">
//                 {privileges.length > 0 ? (
//                     privileges.map((privilege, index) => (
//                         <div key={index} className="dashboard-card">
//                             <h2>{privilege.section}</h2>
//                             <i className={`fas ${getIcon(privilege.section)} icon`}></i>
//                         </div>
//                     ))
//                 ) : (
//                     <p>No active privileges</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// // Helper function to map section to icon
// const getIcon = (section) => {
//     switch (section) {
//         case 'Products':
//             return 'fa-box';
//         case 'Users':
//             return 'fa-users';
//         case 'Pending Orders':
//             return 'fa-truck';
//         case 'Orders':
//             return 'fa-pen-to-square';
//         case 'Add Product':
//             return 'fa-cart-plus';
//         case 'Add Images':
//             return 'fa-image';
//         default:
//             return 'fa-shield-alt';
//     }
// };

// export default Show;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Show = () => {
    const [privileges, setPrivileges] = useState([]);
    const navigate = useNavigate();



    const logout = () => {

        sessionStorage.setItem("isLoggedIn", "false"); // Set logged-in status to false
        navigate('/storelog'); // Redirect to login page or any other page
    };

    const login = () => {

        navigate('/storelog'); // Redirect to login page or any other page
    };


    // Fetch privileges from the backend
    useEffect(() => {
        axios.get('http://localhost:3001/getPrivileges')
            .then(response => {
                const filteredPrivileges = response.data.privileges.filter(privilege => privilege.status === true);
                setPrivileges(filteredPrivileges);
            })
            .catch(error => {
                console.error('Error fetching privileges', error);
            });
    }, []);

    // Handle card click to navigate to different routes
    const handleCardClick = (section) => {
        switch (section) {
            case 'Products':
                navigate('/storedisplay');
                break;
            case 'Users':
                navigate('/admincustomers');
                break;
            case 'Pending Orders':
                navigate('/adminpending');
                break;
            case 'Orders':
                navigate('/adminorders');
                break;
            case 'Add Product':
                navigate('/storeaddproducts');
                break;
            case 'Add Images':
                navigate('/storeimgage');
                break;
            default:
                navigate('/dash');  // Fallback to dashboard
        }
    };

    return (
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
                <h1 className="dashboard-title">Store Admin</h1>
                <div className="dashboard-cards container">
                    {privileges.length > 0 ? (
                        privileges.map((privilege, index) => (
                            <div
                                key={index}
                                className="dashboard-card"
                                onClick={() => handleCardClick(privilege.section)}
                                style={{ cursor: 'pointer' }}
                            >
                                <h2>{privilege.section}</h2>
                                <i className={`fas ${getIcon(privilege.section)} icon`}></i>
                            </div>
                        ))
                    ) : (
                        <p>No active privileges</p>
                    )}
                </div>
            </div>

        </div>
    );
};

// Helper function to map section to icon
const getIcon = (section) => {
    switch (section) {
        case 'Products':
            return 'fa-box';
        case 'Users':
            return 'fa-users';
        case 'Pending Orders':
            return 'fa-truck';
        case 'Orders':
            return 'fa-pen-to-square';
        case 'Add Product':
            return 'fa-cart-plus';
        case 'Add Images':
            return 'fa-image';
        default:
            return 'fa-shield-alt';
    }
};

export default Show;
