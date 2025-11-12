
// import Adminnavbar from './adminnavbar'
// import '../assets/css/admin.css'
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import AOS from 'aos';
// import 'aos/dist/aos.css';

// const Adminpanel = () => {

//     const [customerCount, setCustomerCount] = useState(0);

//     useEffect(() => {
//         // Fetch the customer count from the backend
//         axios.get('http://localhost:3001/count')
//             .then(response => {
//                 setCustomerCount(response.data.count); // Set the count from response
//             })
//             .catch(error => {
//                 console.error("Error fetching customer count:", error);
//             });
//     }, []);


//     useEffect(() => {
//         // Initialize AOS
//         AOS.init({
//             duration: 1000, // Optional: animation duration
//             once: true // Optional: animation only happens once
//         });
//         AOS.refresh();
//     }, []);



//     return (

//         <div>
//             <Adminnavbar />

//             <div className='container'>

//                 <h1 className='admin-title text-center' data-aos="fade-up">Admin Dashboard</h1>

//                 <div class="row mt-5">

//                     {/* add products */}
//                     <div class="col-sm-6 mb-3 mb-sm-0">
//                         <div class="card" data-aos="zoom-in">
//                             <div class="card-body">
//                                 <h2 class="card-title">Add Products</h2>
//                                 <h3><i className="fa-solid fa-cart-plus "></i></h3>




//                                 <Link as={Link} to="/addproducts" class="btn  dash-btn">Add products</Link>
//                             </div>
//                         </div>
//                     </div>

//                     <div class="col-sm-6">
//                         <div class="card" data-aos="zoom-in">
//                             <div class="card-body">
//                                 <h2 class="card-title">Display Products</h2>
//                                 <h3><i className="fa-solid fa-cart-shopping"></i></h3>

//                                 <Link as={Link} to="/displayproduct" class="btn dash-btn">View Products</Link>
//                             </div>
//                         </div>
//                     </div>

//                 </div>


//                 <div class="row mt-3">

//                     {/* view customers */}
//                     <div class="col-sm-6">
//                         <div class="card" data-aos="zoom-in">
//                             <div class="card-body">
//                                 <h2 class="card-title">Users</h2>
//                                 <h3> <i className="fa-solid fa-users"></i></h3>
//                                 <h3 className='me-auto'>{customerCount}</h3>


//                                 <a href="/admincustomers" class="btn dash-btn">View Users</a>
//                             </div>
//                         </div>
//                     </div>

//                     <div class="col-sm-6">
//                         <div class="card" data-aos="zoom-in">
//                             <div class="card-body">
//                                 <h2 class="card-title">Pending Orders</h2>
//                                 <h3><i class="fa-solid fa-pen-to-square"></i></h3>

//                                 <a href="/admincustomers" class="btn dash-btn">View Customers</a>
//                             </div>
//                         </div>
//                     </div>

//                 </div>

//             </div>

//         </div>


//     )
// }



// export default Adminpanel



