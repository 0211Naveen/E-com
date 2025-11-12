import React, { useEffect } from 'react';
import content1pic from '../assets/images/content1.jpg'
import content2pic from '../assets/images/content3.jpg'
import AOS from 'aos';


const Content = () => {


    useEffect(() => {
        AOS.init({
          duration: 1000, 
          once: false, 
        });
        
        AOS.refresh();
      });
  return (
    
//     <div className='contentfull'>
//     <div className="container mt-5">
 
//         <div className="row align-items-center" data-aos="fade-up"  >
//             <div className="col-sm-12 col-md-6 content1box">
//                 <h1 className="content-head text-md-left text-center">THE GREATEST STORIES SHOULD LIVE FOREVER.</h1>
//                 <p className="content-para text-md-left text-center">
//                     Antique Story is, simply, all about the story. We take great pride in culling out the most profound narratives from the past, 
//                     and retelling them through the lens of vintage artifacts, home décor, and handpicked collectibles.the stories live on. Join us in giving these stories a new life.
//                 </p>
//             </div>
//             <div className="col-sm-12 col-md-6 text-center">
//                 <img src={content1pic} className="img-fluid content-img" alt="Content 1" />
//             </div>
//         </div>

//         <div className="row align-items-center mt-3" data-aos="fade-up" >
//             <div className="col-sm-12 col-md-6 text-center">
//                 <img src={content2pic} className="img-fluid content-img" alt="Content 2" />
//             </div>
//             <div className="col-sm-12 col-md-6 content1box">
//                 <h1 className="content-head text-md-left text-center">THE ONE THING ART MUST HAVE IS HEART.</h1>
//                 <p className="content-para text-md-left text-center">
//                     At Antique Story, we put great thought and passion into what we pick and why we pick it. From rare folk art to exquisitely carved wooden panels, 
//                     every object you will discover in this space carries deep inspiration, meaning, and joy in equal measures.they are lessons on life itself. Nothing less can be called art.
//                 </p>
//             </div>
//         </div>
//     </div>
// </div>
<div className="contentfull" style={{ backgroundColor: "#f8f9fa", padding: "50px 0" }}>
  <div className="container mt-5">
    {/* First Row */}
    <div className="row align-items-center" data-aos="fade-up">
      <div className="col-sm-12 col-md-6 content1box">
        <h1
          className="content-head text-md-left text-center"
          style={{ fontSize: "2rem", fontWeight: "bold", color: "#2c3e50" }}
        >
          THE GREATEST STORIES SHOULD LIVE FOREVER.
        </h1>
        <p
          className="content-para text-md-left text-center"
          style={{ fontSize: "1.1rem", lineHeight: "1.8", color: "#555" }}
        >
          Antique Story is, simply, all about the story. We take great pride in culling out the most profound narratives
          from the past and retelling them through the lens of vintage artifacts, home décor, and handpicked
          collectibles. The stories live on. Join us in giving these stories a new life.
        </p>
      </div>
      <div className="col-sm-12 col-md-6 text-center">
        <img
          src={content1pic}
          className="img-fluid content-img"
          alt="Content 1"
          style={{
            borderRadius: "10px",
            transition: "transform 0.3s ease-in-out",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          }}
          // onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          // onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />
      </div>
    </div>

    {/* Second Row */}
    <div className="row align-items-center mt-5" data-aos="fade-up">
      <div className="col-sm-12 col-md-6 text-center">
        <img
          src={content2pic}
          className="img-fluid content-img"
          alt="Content 2"
          style={{
            borderRadius: "10px",
            transition: "transform 0.3s ease-in-out",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          }}
          // onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          // onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />
      </div>
      <div className="col-sm-12 col-md-6 content1box">
        <h1
          className="content-head text-md-left text-center"
          style={{ fontSize: "2rem", fontWeight: "bold", color: "#2c3e50" }}
        >
          THE ONE THING ART MUST HAVE IS HEART.
        </h1>
        <p
          className="content-para text-md-left text-center"
          style={{ fontSize: "1.1rem", lineHeight: "1.8", color: "#555" }}
        >
          At Antique Story, we put great thought and passion into what we pick and why we pick it. From rare folk art to
          exquisitely carved wooden panels, every object you will discover in this space carries deep inspiration,
          meaning, and joy in equal measures. They are lessons on life itself. Nothing less can be called art.
        </p>
      </div>
    </div>
  </div>
</div>


  )
}

export default Content
