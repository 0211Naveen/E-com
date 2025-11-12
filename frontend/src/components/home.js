import React from 'react'
import '../assets/css/home.css'
import Bestselling from './bestselling'
import Banner2 from './banner2'
import Content from './content'
import Gallery from './gallery'
import Footer from './footer'
import Navbar from './navbar'
import HomeBanner from './homebanner'





const Home = () => {
  return (
    
    <div>
      
      <Navbar />
      <HomeBanner />
      <Bestselling />
      {/* <Banner2 /> */}
      <Content />
      <Gallery />
      <Footer />
   
    </div>
  )
}

export default Home
