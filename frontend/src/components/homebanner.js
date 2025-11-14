
// import React, { useState, useEffect } from 'react';
// import { Carousel } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../assets/css/home.css'; // Custom CSS file for the slider

// const Homebanner = () => {
//   const [banners, setBanners] = useState([]);

//   // Fetch banner images from an API
//   useEffect(() => {
//     const fetchBanners = async () => {
//       try {
//         const response = await fetch('http://localhost:3001/bannerimg'); // API endpoint to fetch banner images
//         const data = await response.json();
//         setBanners(data);
//       } catch (error) {
//         console.error('Error fetching banner images:', error);
//       }
//     };

//     fetchBanners();
//   }, []);

//   return (
//     <div>
//       <Carousel>
//         {
//           banners.map((banner, index) => (
//             <Carousel.Item key={index}>
//               <img
//                 className="d-block w-100 slider-image"
//                 src={`http://localhost:3001${banner.path}`} // Assuming your backend serves the path correctly
//                 alt={`Banner ${index + 1}`}
//               />
//             </Carousel.Item>
//           ))
//          }
//       </Carousel>
//     </div>
//   );
// };

// export default Homebanner;



import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/home.css';

const Homebanner = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/bannerimg`);
        const data = await response.json();
        setBanners(data);
      } catch (error) {
        console.error('Error fetching banner images:', error);
      }
    };

    fetchBanners();
  }, []);

  return (
    <div>
      <Carousel>
        {banners.map((banner, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100 slider-image"
              src={banner.url}         // 👈 Cloudinary full URL
              alt={`Banner ${index + 1}`}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Homebanner;
