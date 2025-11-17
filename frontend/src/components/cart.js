
import React, { useEffect, useState, useContext } from "react";
import { Container, Card, Button, Form, Badge } from "react-bootstrap";
import axios from "axios";
import { userContext } from "../App";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Link, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "../assets/css/cart.css";

const Cart = () => {
    const { user } = useContext(userContext);
    const [cartItems, setCartItems] = useState([]);
    const [customerInfo, setCustomerInfo] = useState({
        name: user?.name || "",
        phone: "",
        address: "",
        pincode: "",
    });
    const navigate = useNavigate();
    const userId = sessionStorage.getItem("userId");

    useEffect(() => {
        AOS.init({ duration: 600 });
        if (!userId) {
            toast.error("Please login");
            navigate("/login");
            return;
        }

        axios
            .get(`${process.env.REACT_APP_API_URL}/cart/${userId}`)
            .then((res) => setCartItems(res.data))
            .catch(() => toast.error("Failed to load cart"));
    }, [userId, navigate]);

    const updateQty = (id, delta) => {
        const item = cartItems.find((i) => i._id === id);
        const newQty = item.quantity + delta;
        if (newQty < 1) return;

        axios
            .put(`${process.env.REACT_APP_API_URL}/cart/update/${id}`, { quantity: newQty })
            .then((res) => {
                setCartItems((prev) => prev.map((i) => (i._id === id ? res.data : i)));
            })
            .catch(() => toast.error("Update failed"));
    };

    const removeItem = (id) => {
        axios
            .delete(`${process.env.REACT_APP_API_URL}/cart/remove/${id}`)
            .then(() => {
                setCartItems((prev) => prev.filter((i) => i._id !== id));
                toast.success("Removed");
            })
            .catch(() => toast.error("Remove failed"));
    };

    const total = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

    const handleCheckout = (e) => {
        e.preventDefault();
        if (!customerInfo.name || !customerInfo.phone || !customerInfo.address || !customerInfo.pincode) {
            toast.error("Fill all fields");
            return;
        }
        navigate("/order", { state: { cart: cartItems, totalPrice: total, customerInfo } });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomerInfo((prev) => ({ ...prev, [name]: value }));
    };

    if (!userId) return null;

    return (
        <>
            <Navbar />
            <Container className="py-4 cart-simple">
                <h2 className="text-center mb-4 fw-bold" data-aos="fade-up">
                    My Cart
                </h2>

                {cartItems.length === 0 ? (
                    <Card className="text-center p-5 empty-card" data-aos="zoom-in">
                        <p className="fs-4 text-muted">Your cart is empty</p>
                        <Link to="/display" className="btn btn-primary mt-3">
                            Shop Now
                        </Link>
                    </Card>
                ) : (
                    <>
                        {/* Cart Items - Simple Cards */}
                        {cartItems.map((item, i) => (
                            <Card key={item._id} className="mb-3 item-card" data-aos="fade-up" data-aos-delay={i * 100}>
                                <Card.Body className="d-flex align-items-center">
                                    <img
                                        src={item.image || "https://via.placeholder.com/80"}
                                        alt={item.pname}
                                        className="item-img me-3"
                                    />
                                    <div className="flex-grow-1">
                                        <h6 className="mb-1 fw-bold">{item.pname}</h6>
                                        <p className="mb-0 text-success fw-bold">₹{item.price.toFixed(2)}</p>
                                    </div>

                                    <div className="d-flex align-items-center me-3">
                                        <Button size="sm" variant="outline-secondary" onClick={() => updateQty(item._id, -1)} disabled={item.quantity <= 1}>
                                            −
                                        </Button>
                                        <Badge bg="dark" className="mx-2 px-3">{item.quantity}</Badge>
                                        <Button size="sm" variant="outline-secondary" onClick={() => updateQty(item._id, 1)}>
                                            +
                                        </Button>
                                    </div>
                  
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => removeItem(item._id)}
                                        className="rounded-circle p-2 d-flex align-items-center justify-content-center shadow-sm"
                                        style={{ width: "36px", height: "36px" }}
                                        title="Remove Item"
                                    >
                                        <i className="fas fa-trash-alt"></i>
                                    </Button>
                                </Card.Body>
                            </Card>
                        ))}

                        {/* Total Card */}
                        <Card className="mb-4 total-card" data-aos="fade-up">
                            <Card.Body className="d-flex justify-content-between align-items-center">
                                <h5 className="mb-0 fw-bold">Total</h5>
                                <h4 className="mb-0 text-success fw-bold">₹{total.toFixed(2)}</h4>
                            </Card.Body>
                        </Card>

                        {/* Simple Form */}
                        <Card className="p-4 form-card" data-aos="fade-up">
                            <h5 className="mb-3 fw-bold">Delivery Info</h5>
                            <Form onSubmit={handleCheckout}>
                                <Form.Control
                                    className="mb-3"
                                    placeholder="Name"
                                    name="name"
                                    value={customerInfo.name}
                                    onChange={handleInputChange}
                                    required
                                />
                                <Form.Control
                                    className="mb-3"
                                    placeholder="Phone (10 digits)"
                                    name="phone"
                                    pattern="[0-9]{10}"
                                    value={customerInfo.phone}
                                    onChange={handleInputChange}
                                    required
                                />
                                <Form.Control
                                    as="textarea"
                                    rows={2}
                                    className="mb-3"
                                    placeholder="Address"
                                    name="address"
                                    value={customerInfo.address}
                                    onChange={handleInputChange}
                                    required
                                />
                                <Form.Control
                                    className="mb-3"
                                    placeholder="Pincode (6 digits)"
                                    name="pincode"
                                    pattern="[0-9]{6}"
                                    value={customerInfo.pincode}
                                    onChange={handleInputChange}
                                    required
                                />
                                <Button type="submit" className="w-100 checkout-btn btn-success">
                                    Checkout
                                </Button>
                            </Form>
                        </Card>
                    </>
                )}
            </Container>
            <Footer />
            <ToastContainer />
        </>
    );
};

export default Cart;