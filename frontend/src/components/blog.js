import React from 'react'
import Navbar from './navbar'
import Footer from './footer'
import Content from './content'
import Gallery from './gallery'
import '../assets/css/home.css';


const Blog = () => {
    return (
        <>
            <Navbar />
            {/* <h1 className='text-center mt-3 blog-title'>Blog</h1> */}
            <Gallery />
            <Content />
            <Footer />
        </>
    )
}

export default Blog
