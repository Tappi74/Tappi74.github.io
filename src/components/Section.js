import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import Cloud from '@mui/icons-material/Cloud';
import SupervisedUserCircle from '@mui/icons-material/SupervisedUserCircle';
import LightbulbOutline from '@mui/icons-material/LightbulbCircleOutlined';
import useStyles from '../styles/styles';

const Section = () => {
  const classes = useStyles();

  const sectionItems = [
    {
      id: 1,
      icon: <Cloud sx={{ fontSize: 100 }} color="primary" />,
      sentence:
        'Tarjoamme saumatonta yhdistämistä sulautetuista laitteista pilvipalveluihin, mahdollistaen tehokkaat ja monipuoliset sovellusratkaisut.',
    },
    {
      id: 2,
      icon: <SupervisedUserCircle sx={{ fontSize: 100 }} color="primary" />,
      sentence:
        'Meidän tiimimme koostuu monialaisista ammattilaisista, jotka työskentelevät yhdessä saavuttaakseen yhteisen tavoitteen – asiakkaamme menestyksen.',
    },
    {
      id: 3,
      icon: <LightbulbOutline  sx={{ fontSize: 100 }} color="primary" />,
      sentence: 'Jatkuvasti uudistuva ajattelutapamme mahdollistaa tuoreet näkökulmat ja ratkaisut, jotka erottavat sinut kilpailijoistasi.',
    },
  ];
  return (
    <Box sx={{ flexGrow: 1, minHeight: '400px' }}>
      <Grid container className={classes.sectionGridContainer}>
        {sectionItems.map((item) => (
          <Grid
            item
            xs={12}
            md={3.5}
            minHeight={300}
            key={item.id}
            className={classes.sectionGridItem}
          >
            {item.icon}
            <Typography>{item.sentence}</Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Section;
