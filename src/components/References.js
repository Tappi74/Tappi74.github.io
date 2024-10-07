import React, { useState, useEffect } from 'react';
import { Typography, Box, Card, CardContent, CardMedia, Grid } from '@mui/material';
import { Avatar } from '@mui/material';
import useStyles from '../styles/styles';
import Slide from '@mui/material/Slide';
import { createClient } from 'contentful';

const References = (props) => {
    const [contentFulResp, setContentFulResp] = useState([]);
    const [reviews, setReviews] = useState([]);
    const classes = useStyles();
    const contentfulClient = createClient(
        {
            accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
            space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
        }
    );

    useEffect(() => {
        contentfulClient.getEntries()
            .then((response) => {
                console.log(response.items);
                setContentFulResp(response.items);
            }).catch((error) => {
                console.log(error);
            });

    }, []);

    useEffect(() => {
        contentFulResp.forEach((item, index) => {
            if (item.sys.contentType.sys.id === "clientReference") {
                console.log(item);
                console.log(item.fields.shortStory.content[0].value);
            let object = {
                id: index,
                logo: item.fields.logo.fields.file.url,
                shortStory: item.fields.shortStory.content[0].content[0].value
            };
            reviews.push(object);
        }
        });
    }, [contentFulResp]);
    
    return (
        <Box
            sx={{
                flexGrow: 1,
                padding: '20px',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '300px',
            }}
        >

            <Grid container spacing={2} className={classes.referencesBox}>
                <Grid item sm={12} md={12}>

                    <Typography variant="h4" className={classes.title}>Referenssit</Typography>
                    <hr />
                </Grid>
                {reviews.map((review) => (
                    <Grid item sm={12} md={4} key={review.id}>
                        <Slide direction="left" in={props.slide} timeout={1000} key={review.id}>
                        <Card>
                            <CardContent>
                                <CardMedia
                                    component="img"
                                    sx={{ height: 70, objectFit: "contain", marginLeft: '10px', paddingRight: '20px', paddingBottom: '20px',  alignItems: 'center'  }}
                                    image={review.logo}
                                />
                                <Typography className={classes.testimonialStatement}>
                                    {review.shortStory}
                                </Typography>
                            </CardContent>
                        </Card>
                        </Slide>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default References;