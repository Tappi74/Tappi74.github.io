import {useRef, forwardRef } from 'react';
import { Box, Typography, Link } from '@mui/material';
import useStyles from '../styles/styles';

const Footer = forwardRef((props, ref) => {
  const date = new Date().getFullYear();
  const classes = useStyles();
  const scrollToRef = useRef();

  return (
    
    <Box sx={{ flexGrow: 1 }} className={classes.footerContainer} ref={ref}>
      <Typography className={classes.footerText}>
        Copyright {date} Floun Oy
      </Typography>
    </Box>
    
  );
});

export default Footer;