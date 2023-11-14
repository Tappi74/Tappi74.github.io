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

  const [scrollPosition, setScrollPosition] = useState(0);
  const [serviceSlider, setServiceSlider] = useState(false);
  const [blogSlider, setBlogSlider] = useState(false);
  const [referencesSlider, setReferencesSlider] = useState(false);
  const scrollToRef = useRef();

  useEffect(() => {
    function handleScroll() {
      const newScrollPosition = window.scrollY;
      //setScrollPosition(newScrollPosition);
      if(newScrollPosition > 200){
        setServiceSlider(true);
      } 
      if(newScrollPosition > 500){
        setBlogSlider(true);
      }
      if(newScrollPosition > 1000){
        setReferencesSlider(true);
      }
    }
    window.addEventListener('scroll', handleScroll, {passive: true});

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  },[]);

  useEffect(() => {
    console.log(scrollPosition);
  },[scrollPosition]);

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
        <Section slide={serviceSlider} />
        <Blog  slide={blogSlider} />
        <References slide={referencesSlider} />
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
