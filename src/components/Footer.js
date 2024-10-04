import {useRef, forwardRef } from 'react';
import { Box, Grid, Typography, Link } from '@mui/material';
import useStyles from '../styles/styles';

const Footer = forwardRef((props, ref) => {
  const date = new Date().getFullYear();
  const classes = useStyles();
  const scrollToRef = useRef();

  return (
    
    <Box sx={{ flexGrow: 1 }} className={classes.footerContainer} ref={ref}>
      <Grid container>
        <Grid item xs={4} sm={4}>
          <Typography style={{fontSize: '1.0rem', fontWeight: 'bold', color: '#ffffff', paddingLeft:'10px'}}>
            Floun Oy
          </Typography>
          <Typography style={{paddingBottom: '10px'}} />
          <Typography className={classes.footerText}>
            Kaivolankatu 24 B
          </Typography>
          <Typography className={classes.footerText}>
            FI38700 Kankaanpää
          </Typography>
          <Typography className={classes.footerText}>
            Finland
          </Typography>
          <Typography className={classes.footerText}>
          </Typography>
          <Typography className={classes.footerText}>
            Y-tunnus: 2439137-6
          </Typography>
        </Grid>
        <Grid item xs={4} sm={4}>
          <Typography style={{fontSize: '1.0rem', fontWeight: 'bold', color: '#ffffff', paddingLeft:'10px'}}>
            Yhteys
          </Typography>
          <Typography style={{paddingBottom: '10px'}} />
          <Typography className={classes.footerText}>
            DI Matti-Pekka Korkeala
          </Typography>
          <Typography className={classes.footerText}>
            +358 50 342 7462  
          </Typography>
          <Typography style={{paddingBottom: '10px'}} />
          <Typography className={classes.footerText}>
            DI Tapio Karinsalo
          </Typography>
          <Typography className={classes.footerText}>
            +358 50 518 8074
          </Typography>
          <Typography style={{paddingBottom: '10px'}} />
          <Typography className={classes.footerText}>
            DI Aki Halme
          </Typography>
          <Typography className={classes.footerText}>
            +358 40 581 0336
          </Typography>
          <Typography style={{paddingBottom: '10px'}} />
          <Typography className={classes.footerText}>
            email: etunimi.sukunimi(at)floun.fi
          </Typography>
        </Grid>
      </Grid>
    </Box>
    
  );
});

export default Footer;