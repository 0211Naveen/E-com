import React, { useEffect } from 'react'
import '../assets/css/home.css'
import artb from '../assets/images/artb.png'
import AOS from 'aos';


const HomeBanner = () => {

  useEffect(() => {
    AOS.init({

    });
    AOS.refresh(); // Refresh AOS on component update
  }, []);
  
  return (
    <div>
        <div className='container-fluid banner mt-1'>
            <div data-aos="fade-up" >
                
                <img src={artb} className='img-fluid' alt="" />

            </div>


        </div>
      
    </div>
  )
}

export default HomeBanner
