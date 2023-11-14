import React, { useState, useEffect } from 'react';
import { Typography, Box, Card, CardMedia, CardContent, Grid } from '@mui/material';
import { Avatar } from '@mui/material';
import useStyles from '../styles/styles';
import Slide from '@mui/material/Slide';
import { createClient } from 'contentful';

const Blog = (props) => {
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
            console.log(index + " " + item.fields.title);
            let object = {
                id: index,
                title: item.fields.title,
                blog_image: item.fields.blogImage.fields.file.url,
                statement: item.fields.post,
                author: item.fields.author,
                image_url: item.fields.authorImage.fields.file.url,
            };
            reviews.push(object);
        });
    }, [contentFulResp]);

    useEffect(() => {
        console.log("length: " + reviews.length);
    }, [reviews]);

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

            <Grid container spacing={2} className={classes.blogBox}>
                <Grid item sm={12} md={12}>

                    <Typography variant="h4" className={classes.title}>Blogi</Typography>
                    <hr />
                </Grid>
                {reviews.length >= 0 && reviews.map((review) => (

                    <Grid item sm={12} md={4} key={review.id}>
                        <Slide direction="left" in={props.slide} timeout={1000} key={review.id}>
                            <Card >
                                <CardMedia
                                    component="img"
                                    sx={{ height: 80}}
                                    image={review.blog_image}
                                />
                                <CardContent>
                                    <Typography className={classes.testimonialStatement} style={{ fontWeight: 'bold' }}>
                                        {review.title}
                                    </Typography>
                                    <Typography className={classes.testimonialStatement}>
                                        {review.statement}
                                    </Typography>
                                    <Box sx={{ display: 'flex' }}>
                                        <Avatar
                                            src={review.image_url}
                                            size="large"
                                            className={classes.avatar}
                                        />
                                        <Box>
                                            <Typography>{review.name}</Typography>
                                            <Typography className={classes.testimonialPosition}>
                                                {review.author}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Slide>
                    </Grid>

                ))}
            </Grid>
        </Box>
    );
};

export default Blog;