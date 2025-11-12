
import React, { useEffect } from 'react';
import clock from '../assets/images/clock-2.webp';
import coins from '../assets/images/coin.jpg';
import pot from '../assets/images/pot.jpg';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import '../assets/css/home.css';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

const Bestselling = () => {

  useEffect(() => {
    AOS.init({
       
    });

    AOS.refresh();
  });

  return (
    <div className=''>
      <div className='container '>
        <p className='text-center home-title' data-aos="fade-up" data-aos-duration="1000">Best Selling</p>
        <div className='row mt-5'>
          <div className="col-sm-4 mt-2" data-aos="fade-up">
            <Card>
              <div className="img-container">
                <Card.Img variant="top" src={clock} className="img-fluid bestselling-img " data-aos-duration="1000"/>
              </div>
              <Card.Body>
                <Card.Title>Clock</Card.Title>
                <Button className='bestselling-btn' href='/display'>Shop Now</Button>
              </Card.Body>
            </Card>
          </div>

          <div className="col-sm-4 mt-2" data-aos="fade-up">
            <Card>
              <div className="img-container">
                <Card.Img variant="top" src={coins} className="img-fluid bestselling-img" data-aos-duration="1000" />
              </div>
              <Card.Body>
                <Card.Title>Coins</Card.Title>
                <Button className='bestselling-btn' href='/display'>Shop Now</Button>
              </Card.Body>
            </Card>
          </div>

          <div className="col-sm-4 mt-2" data-aos="fade-up">
            <Card>
              <div className="img-container">
                <Card.Img variant="top" src={pot} className="img-fluid bestselling-img" data-aos-duration="1000" />
              </div>
              <Card.Body>
                <Card.Title>Pots</Card.Title>
                <Button className='bestselling-btn' href='/display'>Shop Now</Button>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bestselling;
