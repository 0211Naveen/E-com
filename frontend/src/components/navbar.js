// src/components/navbar/CusNavbar.jsx
import React, { useContext, useEffect, useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../App";
import axios from "axios";
import "../assets/css/nav.css";

const CusNavbar = () => {
  const { user, setUser } = useContext(userContext);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  const userId = user?._id || sessionStorage.getItem("userId");

  // Fetch cart count whenever user or page changes
useEffect(() => {
  if (!userId) {
    setCartCount(0);
    return;
  }

  const fetchCartCount = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/cart/${userId}`);

      // ✅ FIX — count only UNIQUE PRODUCTS
      const count = res.data.length;

      setCartCount(count);
    } catch (err) {
      console.error("Failed to fetch cart count:", err);
      setCartCount(0);
    }
  };

  fetchCartCount();

  const interval = setInterval(fetchCartCount, 5000);
  return () => clearInterval(interval);
}, [userId]);


  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("userId");
    sessionStorage.setItem("isLoggedIn", "false");
    setCartCount(0);
    navigate("/home");
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary bg-nav" id="bg-nav">
      <Container>
        <Navbar.Brand as={Link} to="/home" className="nav-brand">
          Antique
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="m-auto mt-1 justify-content-between">
            <Nav.Link as={Link} to="/home" className="nav-names ms-2">Home</Nav.Link>
            <Nav.Link as={Link} to="/display" className="nav-names ms-2">Products</Nav.Link>
            <Nav.Link as={Link} to="/blog" className="nav-names ms-2">Blog</Nav.Link>
            <Nav.Link as={Link} to="/userdashboard" className="nav-names ms-2">Dashboard</Nav.Link>
          </Nav>

          <Nav className="ml-auto d-flex align-items-start">
            {/* CART WITH BADGE */}
            <Nav.Link as={Link} to="/cart" className="icon-link position-relative mt-1">
              <i className="fa-solid fa-cart-shopping"></i>
              {cartCount > 0 && (
                <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
                  {cartCount}
                </span>
              )}
            </Nav.Link>

            <Nav.Link as={Link} to="/wishlist" className="icon-link d-flex align-items-start mt-1">
              <i className="fa-solid fa-heart"></i>
            </Nav.Link>

            <Nav.Link as={Link} to="/" className="icon-link d-flex align-items-start mt-1">
              <i className="fa-solid fa-user"></i>
            </Nav.Link>

            <Nav.Link>
              <span className="nav-user-name fw-5">{user ? user.name : "Guest"}</span>
            </Nav.Link>

            <Nav.Link
              className="btn icon-link mt-1"
              onClick={logout}
              aria-label="Logout"
              style={{ cursor: "pointer" }}
            >
              <i className="fa-solid fa-right-from-bracket"></i>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CusNavbar;