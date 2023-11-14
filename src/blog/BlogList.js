import { useEffect, useState } from 'react';
import { createClient } from 'contentful';
import BlogPost from './BlogPost';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);

    const client = createClient({ space: process.env.REACT_APP_SPACE_ID, accessToken: process.env.REACT_APP_ACCESS_KEY });
    useEffect(() => {
        const AllEntries = async () => {
            try {
                await client.getEntries().then(entries => {
                    console.log(entries.items);
                    setBlogs(entries.items);
                })
            } catch {
                console.log("Error");
            }
        }
        AllEntries();
    }, []);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                {blogs && blogs.map(blog => (
                    <Grid item xs={4}>
                        <BlogPost title={blog.fields.title} content={blog.fields.post} imageUrl={blog.fields.blogImage.fields && blog.fields.blogImage.fields.file.url} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default BlogList;