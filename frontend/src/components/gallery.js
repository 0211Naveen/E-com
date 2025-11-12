import React, { useEffect } from 'react';
import '../assets/css/home.css'
import AOS from 'aos';
import pic1 from '../assets/images/pic-1.jpg'
import pic2 from '../assets/images/pic-9.jpg'
import pic3 from '../assets/images/pic-8.jpg'
import pic4 from '../assets/images/pic-5.jpg'
import pic5 from '../assets/images/pot2.jpg'
import pic6 from '../assets/images/pic-6.jpg'


const Gallery = () => {

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000, // Optional: animation duration
      once: true // Optional: animation only happens once
    });
    AOS.refresh();
  });


  return (
    <div >
      <h1 className='text-center gallery-title' data-aos="fade-up" >Our gallery</h1>

      {/* <div className='d-flex justify-content-center'>

        <div class=" container row mt-5"  >
          <div class="col-lg-4 col-md-12 mb-4 mb-lg-0">
            <img
              src={pic1}
              class="pic1 shadow-1-strong rounded mb-4 img-fluid"
              alt="Gem with chain x" data-aos="fade-up" />

            <img
              src={pic2}
              class="pic2 w-100 shadow-1-strong rounded mb-4 img-fluid"
              alt="down pic pot y" data-aos="fade-up" />
          </div>

          <div class="col-lg-4 mb-4 mb-lg-0">
            <img
              src={pic3}
              class=" w-100 shadow-1-strong rounded mb-4 img-fluid" id="pic3"
              alt="sand clock y" data-aos="fade-up" />

            <img
              src={pic4}
              class="pic4 w-100 shadow-1-strong rounded mb-4 img-fluid"
              alt="brasled x" data-aos="fade-up" />
          </div>

          <div class="col-lg-4 mb-4 mb-lg-0">
            <img
              src={pic5}
              class="pic5 w-100 shadow-1-strong rounded mb-4 img-fluid"
              alt="bowl x" data-aos="fade-up" />

            <img
              src={pic6}
              class="w-100 shadow-1-strong rounded mb-4 img-fluid" id="pic6"
              alt="lamp y" data-aos="fade-up" />
          </div>
        </div>

      </div> */}

{/* <div className="d-flex justify-content-center">
  <div className="container row mt-5">
    <div className="col-lg-4 col-md-12 mb-4 mb-lg-0">
      <img
        src={pic1}
        className="pic1 shadow-1-strong rounded mb-4 img-fluid"
        alt="Gem with chain x"
        data-aos="fade-up"
        style={{ transition: "transform 0.3s ease-in-out" }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(0.9)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      />
      <img
        src={pic2}
        className="pic2 w-100 shadow-1-strong rounded mb-4 img-fluid"
        alt="down pic pot y"
        data-aos="fade-up"
        style={{ transition: "transform 0.3s ease-in-out" }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(0.9)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      />
    </div>

    <div className="col-lg-4 mb-4 mb-lg-0">
      <img
        src={pic3}
        className="w-100 shadow-1-strong rounded mb-4 img-fluid"
        id="pic3"
        alt="sand clock y"
        data-aos="fade-up"
        style={{ transition: "transform 0.3s ease-in-out" }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(0.9)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      />
      <img
        src={pic4}
        className="pic4 w-100 shadow-1-strong rounded mb-4 img-fluid"
        alt="bracelet x"
        data-aos="fade-up"
        style={{ transition: "transform 0.3s ease-in-out" }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(0.9)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      />
    </div>

    <div className="col-lg-4 mb-4 mb-lg-0">
      <img
        src={pic5}
        className="pic5 w-100 shadow-1-strong rounded mb-4 img-fluid"
        alt="bowl x"
        data-aos="fade-up"
        style={{ transition: "transform 0.3s ease-in-out" }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(0.9)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      />
      <img
        src={pic6}
        className="w-100 shadow-1-strong rounded mb-4 img-fluid"
        id="pic6"
        alt="lamp y"
        data-aos="fade-up"
        style={{ transition: "transform 0.3s ease-in-out" }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(0.9)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      />
    </div>
  </div>
</div> */}

<div className="d-flex justify-content-center">
  <div className="container row mt-5">
    <div className="col-lg-4 col-md-12 mb-4 mb-lg-0">
      <img
        src={pic1}
        className="pic1 shadow-1-strong rounded mb-4 img-fluid"
        alt="Gem with chain x"
        data-aos="fade-up"
        style={{ transition: "transform 0.3s ease-in-out" }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(0.95)")} 
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      />
      <img
        src={pic2}
        className="pic2 w-100 shadow-1-strong rounded mb-4 img-fluid"
        alt="down pic pot y"
        data-aos="fade-up"
        style={{ transition: "transform 0.3s ease-in-out" }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(0.95)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      />
    </div>

    <div className="col-lg-4 mb-4 mb-lg-0">
      <img
        src={pic3}
        className="w-100 shadow-1-strong rounded mb-4 img-fluid"
        id="pic3"
        alt="sand clock y"
        data-aos="fade-up"
        style={{ transition: "transform 0.3s ease-in-out" }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(0.95)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      />
      <img
        src={pic4}
        className="pic4 w-100 shadow-1-strong rounded mb-4 img-fluid"
        alt="bracelet x"
        data-aos="fade-up"
        style={{ transition: "transform 0.3s ease-in-out" }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(0.95)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      />
    </div>

    <div className="col-lg-4 mb-4 mb-lg-0">
      <img
        src={pic5}
        className="pic5 w-100 shadow-1-strong rounded mb-4 img-fluid"
        alt="bowl x"
        data-aos="fade-up"
        style={{ transition: "transform 0.3s ease-in-out" }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(0.95)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      />
      <img
        src={pic6}
        className="w-100 shadow-1-strong rounded mb-4 img-fluid"
        id="pic6"
        alt="lamp y"
        data-aos="fade-up"
        style={{ transition: "transform 0.3s ease-in-out" }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(0.95)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      />
    </div>
  </div>
</div>


    </div>
  )
}

export default Gallery
