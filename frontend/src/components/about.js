
import React from "react";
import Side from "./side";
import '../assets/css/side.css';

const About = () => {
    return (
        <>
            <div className="about-container">
                <Side />
                <div className="content">
                    <h1>About Page</h1>
                </div>
            </div>
        </>
    );
};

export default About;
