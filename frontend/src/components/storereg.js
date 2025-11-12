import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";



function Storereg() {

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()
    

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:3001/storeregister", { name, email, password })
            .then(result => {

                console.log(result)
                navigate("/storelog")
            })
            .catch(err => console.log(err))
    }


    return (
        <>
            <div className="d-flex justify-content-center align-items-center min-vh-100">
                <div className="bg-white p-4 rounded w-100" style={{ maxWidth: '400px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <h2 className="text-center form-title mb-4"> Store Sign Up</h2>

                    <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                <strong>Name</strong>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Name"
                                autoComplete="off"
                                name="name"
                                className="form-control rounded-0"
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
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
                                required
                            />
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
                                required
                            />
                        </div>
                        <button type="submit" className="btn submit-btn w-100 rounded-0">
                            Sign Up
                        </button>
                    </form>

                    <p className="text-center mt-3">Already have an account?</p>
                    <Link to="/storelog" className="btn btn-light border w-100 rounded-0 text-decoration-none">
                        Login
                    </Link>
                </div>
            </div>
        </>





    );
}

export default Storereg;