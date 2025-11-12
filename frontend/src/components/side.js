
import React from "react";
import { Link } from "react-router-dom";
import '../assets/css/side.css';

const Side = () => {
  return (
    <div className="side-nav">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
    </div>
  );
};

export default Side;
