import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


const AdminLogin = () => {
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const navigate = useNavigate();

      const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_API_URL}/adminlogin`, { email, password })
            .then(result => {
                console.log(result.data)
                if (result.data.status === "Success") {
                    sessionStorage.setItem('isLoggedIn', 'true');
                    navigate("/dash");
                }
                else {
                    alert(result.data.message); // Show error message from the server
                    navigate("/adminreg");
                }
            })
            .catch(err => console.log(err));
    };

 

   

    return (
         <div className="d-flex justify-content-center align-items-center min-vh-100">
                    <div className="bg-white p-4 rounded w-100" style={{ maxWidth: '400px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                        <h2 className="text-center form-title mb-4">Admin Login</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">
                                    <strong>Email</strong>
                                </label>
                                <input 
                                    type="email" 
                                    placeholder="Enter Email" 
                                    autoComplete="off" 
                                    name="email" 
                                    className="form-control rounded-0" 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    required/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">
                                    <strong>Password</strong>
                                </label>
                                <input 
                                    type="password" 
                                    placeholder="Enter Password" 
                                    name="password" 
                                    className="form-control rounded-0" 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    required/>
                            </div>
                            <button type="submit" className="btn submit-btn w-100 rounded-0">
                                Login
                            </button>
                        </form>
                        {/* <p className="text-center mt-3">Don't have an account?</p>
                        <Link to="/adminreg" className="btn btn-light border w-100 rounded-0 text-decoration-none">
                            Sign Up
                        </Link> */}
                    </div>
                </div>
    );
};

export default AdminLogin;
