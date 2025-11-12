import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './navbar';
import Footer from './footer';
import { pdf } from '@react-pdf/renderer';
import Orderpdf from './orderpdf';
import { userContext } from '../App'; // Adjust the path if necessary
import '../assets/css/products.css';

const Order = () => {
    const location = useLocation();
    const { cart, totalPrice, customerInfo } = location.state || {};

    // Use userContext to fetch user details
    const { user } = useContext(userContext);

    const [paymentMethod, setPaymentMethod] = useState('');
    const [paymentDetails, setPaymentDetails] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        upiId: '',
    });
    const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);


    const handlePaymentSubmit = async (e) => {
        e.preventDefault();
        try {
            const orderDetails = {
                customerInfo,
                cart,
                totalPrice,
                paymentDetails,
                userId: user?.userId, // Use userId from context
            };
    
            // Send order details to backend
            const response = await fetch(`${process.env.REACT_APP_API_URL}/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderDetails),
            });
    
            if (response.ok) {
                alert('Payment successful! Order saved.');
                setIsPaymentSuccessful(true);
            } else {
                alert('Failed to save order. Please try again.');
            }
        } catch (error) {
            console.error("Error during payment:", error);
            alert('Failed to process payment.');
        }
    };
    

    // Generate and Download PDF
    const handleDownloadPDF = async () => {
        try {
            const blob = await pdf(<Orderpdf customerInfo={customerInfo} cart={cart} totalPrice={totalPrice} />).toBlob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'order-summary.pdf');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Error generating PDF:", error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container mt-4 p-4 bg-light rounded shadow-sm">
            <h1 className='text-center p-3 order-title text-dark fw-bold shadow-sm rounded' data-aos="fade-up">Order Summary 📦</h1>
            
            {/* Display logged-in user */}
            {/* <p className="fw-bold text-dark"><b>User Name:</b> {user?.name || 'Guest'}</p> */}

            {/* Customer Information */}
            <h3 className='order-title text-primary fw-bold' data-aos="fade-up">Delivery To:</h3>
            <div className="p-3 bg-white rounded shadow-sm" data-aos="fade-up">
                <p><b>Name:</b> {customerInfo?.name}</p>
                <p><b>Phone:</b> {customerInfo?.phone}</p>
                <p><b>Address:</b> {customerInfo?.address}</p>
                <p><b>Pincode:</b> {customerInfo?.pincode}</p>
            </div>

            {/* Order Details */}
            <h3 className='order-title text-primary fw-bold mt-4' data-aos="fade-up">Order Details:</h3>
            <div className="table-responsive shadow-sm rounded p-3 bg-white" data-aos="fade-up">
                <table className="table table-bordered text-center">
                    <thead className='thead-light bg-primary text-white'>
                        <tr>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((item) => (
                            <tr key={item._id}>
                                <td>{item.pname}</td>
                                <td>{item.quantity || 1}</td>
                                <td>Rs. {item.price.toFixed(2)}</td>
                                <td>Rs. {(item.price * (item.quantity || 1)).toFixed(2)}</td>
                            </tr>
                        ))}
                        <tr className='table-info fw-bold'>
                            <td colSpan={3} className='text-center'>Total Price:</td>
                            <td className='text-success fs-5'>Rs. {totalPrice?.toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Payment Section */}
            <h3 className="mt-4 order-title text-primary fw-bold" data-aos="fade-up">Payment Details</h3>
            <div className="p-4 bg-white rounded shadow-sm" data-aos="fade-up">
                <form onSubmit={handlePaymentSubmit}>
                    <div className="mb-3">
                        <label className="fw-bold">Select Payment Method</label>
                        <select
                            className="form-control shadow-sm"
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            required>
                            <option value="">--Select--</option>
                            <option value="creditCard">Credit Card</option>
                            <option value="debitCard">Debit Card</option>
                            <option value="upi">UPI</option>
                        </select>
                    </div>

                    {/* Credit/Debit Card Fields */}
                    {(paymentMethod === 'creditCard' || paymentMethod === 'debitCard') && (
                        <>
                            <div className="mb-3">
                                <label className="fw-bold">Card Number</label>
                                <input
                                    type="text"
                                    className="form-control shadow-sm"
                                    value={paymentDetails.cardNumber}
                                    onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })}
                                    required
                                    placeholder="Enter your card number" />
                            </div>
                            <div className="mb-3">
                                <label className="fw-bold">Expiry Date</label>
                                <input
                                    type="text"
                                    className="form-control shadow-sm"
                                    value={paymentDetails.expiryDate}
                                    onChange={(e) => setPaymentDetails({ ...paymentDetails, expiryDate: e.target.value })}
                                    required
                                    placeholder="MM/YY" />
                            </div>
                            <div className="mb-3">
                                <label className="fw-bold">CVV</label>
                                <input
                                    type="password"
                                    className="form-control shadow-sm"
                                    value={paymentDetails.cvv}
                                    onChange={(e) => setPaymentDetails({ ...paymentDetails, cvv: e.target.value })}
                                    required
                                    placeholder="Enter CVV" />
                            </div>
                        </>
                    )}

                    {/* UPI Field */}
                    {paymentMethod === 'upi' && (
                        <div className="mb-3">
                            <label className="fw-bold">UPI ID</label>
                            <input
                                type="text"
                                className="form-control shadow-sm"
                                value={paymentDetails.upiId}
                                onChange={(e) => setPaymentDetails({ ...paymentDetails, upiId: e.target.value })}
                                required
                                placeholder="Enter your UPI ID" />
                        </div>
                    )}

                    <div className="text-center">
                        <button type="submit" className="btn btn-success px-5 py-2 shadow-sm rounded-pill fw-bold">Pay Now 🚀</button>
                    </div>
                </form>
            </div>

            {/* Button to download PDF */}
            {isPaymentSuccessful && (
                <div className="text-center mt-4">
                    <button className="btn btn-primary shadow-sm rounded-pill px-4 py-2 fw-bold" onClick={handleDownloadPDF}>📄 Download Order Summary</button>
                </div>
            )}
        </div>
            <Footer />
        </>
    );
};

export default Order;
