import React from 'react';
import '../assets/css/footer.css'

const Footer = () => {
  return (
    <>
      {/* <footer className="bg-footer text-dark py-4 mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h2 >Antique</h2>
              <h5>About Us</h5>
              <p>
                We are a company committed to providing the best services and products to our customers.
              </p>
            </div>
            <div className="col-md-4">
              <h4>Links</h4>
              <ul className="list-unstyled">
                <li><a href="/about" className="text-dark ft-link">About Us</a></li>
                <li><a href="/contact" className="text-dark ft-link">Contact Us</a></li>
                <li><a href="/privacy" className="text-dark ft-link">Privacy Policy</a></li>
                <li><a href="/terms" className="text-dark ft-link">Terms of Service</a></li>
              </ul>
            </div>
            <div className="col-md-4">
              <h4>Follow Us</h4>
              <ul className="list-unstyled">
                <li><a ><i class="fa-brands fa-facebook"></i></a></li>
                <li><a><i class="fa-brands fa-twitter"></i></a></li>
                <li><a ><i class="fa-brands fa-instagram"></i></a></li>
                <li><a ><i class="fa-brands fa-youtube"></i></a></li>
              </ul>
            </div>
          </div>
          <div className="text-center ft-bot">
          <p>&copy; {new Date().getFullYear()} <span className='footer-title'>Antique.</span> All Rights Reserved.</p>
        </div>
        </div>
      </footer> */}


<footer
  className="bg-dark text-light py-5 mt-5"
  style={{ borderTop: "5px solid " }}
>
  <div className="container">
    <div className="row text-center">
      {/* About Section */}
      <div className="col-md-4 mb-4">
        <h2 style={{ color: "#c4a35a", fontWeight: "bold" }}>Antique</h2>
        <h5 className="mt-3" style={{ fontWeight: "600" }}>About Us</h5>
        <p style={{ fontSize: "1rem", lineHeight: "1.6", color: "#dcdcdc" }}>
          We are dedicated to curating timeless antiques and collectibles,
          offering unique pieces that carry history and elegance.
        </p>
      </div>

      {/* Links Section */}
      <div className="col-md-4 mb-4">
        <h4 className="mb-3" style={{ fontWeight: "600" }}>Quick Links</h4>
        <ul className="list-unstyled d-flex flex-column align-items-center">
          <li><a href="/about" className="ft-link">About Us</a></li>
          <li><a href="/contact" className="ft-link">Contact Us</a></li>
          <li><a href="/privacy" className="ft-link">Privacy Policy</a></li>
          <li><a href="/terms" className="ft-link">Terms of Service</a></li>
        </ul>
      </div>

      {/* Social Media Section */}
      <div className="col-md-4 mb-4">
        <h4 className="mb-3" style={{ fontWeight: "600" }}>Follow Us</h4>
        <div className="d-flex justify-content-center gap-3">
          <a href="#" className="social-icon"><i className="fa-brands fa-facebook"></i></a>
          <a href="#" className="social-icon"><i className="fa-brands fa-twitter"></i></a>
          <a href="#" className="social-icon"><i className="fa-brands fa-instagram"></i></a>
          <a href="#" className="social-icon"><i className="fa-brands fa-youtube"></i></a>
        </div>
      </div>
    </div>

    {/* Bottom Footer Text */}
    <div className="text-center mt-4">
      <p style={{ fontSize: "1rem", color: "#dcdcdc" }}>
        &copy; {new Date().getFullYear()} <span className="footer-title" style={{ color: "#c4a35a" }}>Antique</span>. All Rights Reserved.
      </p>
    </div>
  </div>

  {/* Inline CSS */}
  <style>
    {`
      .ft-link {
        color: #dcdcdc;
        text-decoration: none;
        font-size: 1rem;
        transition: color 0.3s ease-in-out;
        padding: 5px 0;
      }
      .ft-link:hover {
        color: #c4a35a;
      }
      .social-icon {
        font-size: 1.8rem;
        color: #dcdcdc;
        transition: transform 0.3s ease-in-out, color 0.3s ease-in-out;
      }
      .social-icon:hover {
        transform: scale(1.2);
        color: #c4a35a;
      }
    `}
  </style>
</footer>


    </>

  );
};

export default Footer;
