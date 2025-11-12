import React from 'react'
import '../assets/css/home.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import pot2 from '../assets/images/coin.jpg'
import Navbar from './navbar'
import HomeBanner from './homebanner'
import Footer from './footer'


const Coins = () => {
  return (
    <div>
      <Navbar />
      <HomeBanner />
     

      <div className='container'>
        <p className='text-center home-title'>Antique Coins</p>
        <div className='row mt-5'>

          <div className="col-sm-4">
            <Card >
              <Card.Img variant="top" src={pot2} className="img-fluid p-" />
              <Card.Body>
                <Card.Title>Clock</Card.Title>

                <Button variant="primary">shop now</Button>
              </Card.Body>
            </Card>
          </div>
          <div className="col-sm-4">
            <Card >
              <Card.Img variant="top" src={pot2} className="img-fluid p-" />
              <Card.Body>
                <Card.Title>Coins</Card.Title>

                <Button variant="primary">shop now</Button>
              </Card.Body>
            </Card>
          </div>
          <div className="col-sm-4">
            <Card >
              <Card.Img variant="top" src={pot2} className="img-fluid p-" />
              <Card.Body>
                <Card.Title>pots</Card.Title>

                <Button variant="primary">shop now</Button>
              </Card.Body>
            </Card>
          </div>

        </div>
        <div className='row mt-5'>

          <div className="col-sm-4">
            <Card >
              <Card.Img variant="top" src={pot2} className="img-fluid p-" />
              <Card.Body>
                <Card.Title>Clock</Card.Title>

                <Button variant="primary">shop now</Button>
              </Card.Body>
            </Card>
          </div>
          <div className="col-sm-4">
            <Card >
              <Card.Img variant="top" src={pot2} className="img-fluid p-" />
              <Card.Body>
                <Card.Title>Coins</Card.Title>

                <Button variant="primary">shop now</Button>
              </Card.Body>
            </Card>
          </div>
          <div className="col-sm-4">
            <Card >
              <Card.Img variant="top" src={pot2} className="img-fluid p-" />
              <Card.Body>
                <Card.Title>pots</Card.Title>

                <Button variant="primary">shop now</Button>
              </Card.Body>
            </Card>
          </div>

        </div>
      </div>
<Footer />

    </div>
  )
}

export default Coins
