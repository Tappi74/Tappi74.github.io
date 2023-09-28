import React from 'react';
import { Grid, Typography, Button, Box } from '@mui/material';
import myteam from '../images/myteam.jpg';
import chip from '../images/heroPicture.png';
import useStyles from '../styles/styles';

const Hero = () => {
  const classes = useStyles();

  return (
    <Box className={classes.heroBox}>
      <Grid container spacing={6} className={classes.gridContainer}>
        <Grid item xs={12} md={7}>
          <Typography variant="h6" fontWeight={700} className={classes.title}>
            Esineiden internetin aikakausi on täällä 
          </Typography>
          <Typography variant="h6" fontWeight={700} className={classes.title}>
            - Me olemme sen kärjessä - 
          </Typography>
          <Typography variant="h6" className={classes.subtitle}>
            Olipa kyseessä ohjelmistosuunnittelu, sulautettujen järjestelmien kehitys, edistyksellinen elektroniikka tai IoT-ratkaisut, me olemme sinun ykköskumppanisi.
          </Typography>
          <Typography variant="h6" fontWeight={700} className={classes.title}>
            Autamme sinua innovoimaan ja erottumaan alallasi.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ width: '200px', fontSize: '16px' }}
          >
            OTA YHTEYTTÄ !
          </Button>
        </Grid>
        <Grid item xs={12} md={5}>
          <img src={chip} alt="My Team" className={classes.largeImage} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Hero;