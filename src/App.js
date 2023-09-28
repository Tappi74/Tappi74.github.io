import { useEffect, useState, Fragment } from 'react'
import BlogList from './blog/BlogList';
import CssBaseline from '@mui/material/CssBaseline';
import { styled } from "@mui/system";
import backgroundImage from './images/Background2.png';
import Header from './components/Header';



function App() {
  return (
    <Fragment>
      <CssBaseline />

      <Header />
      {/*  <Hero />
        <Section />
        <AboutUs />
        <Testimonial />
        <StyledBlogList></StyledBlogList>
        <ContactUs />
  <Footer />*/}

    </Fragment>
  );
}

export default App;
