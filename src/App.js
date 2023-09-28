import { useEffect, useState, Fragment, useRef } from 'react';
import BlogList from './blog/BlogList';
import CssBaseline from '@mui/material/CssBaseline';
import { styled } from "@mui/system";
import backgroundImage from './images/Background2.png';
import Header from './components/Header';
import Hero from './components/Hero';
import Section from './components/Section';
import Footer from './components/Footer';
import Blog from './components/Blog';
import References from './components/References';
import AboutUs from './components/AboutUs';



function App() {

  const scrollToRef = useRef();

  const onClick = () => {
    console.log(scrollToRef.current);
    if(scrollToRef.current){
      
      scrollToRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Fragment>
      <CssBaseline />

      <Header onClick={onClick} />
        <Hero />
        <Section />
        <References />
        <Blog />
        <Footer ref={scrollToRef} />
        <AboutUs />
        {/*<Testimonial />
        <StyledBlogList></StyledBlogList>
        <ContactUs />
  <Footer />*/}

    </Fragment>
  );
}

export default App;
