import React from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";

import Post from "./Post/Post.js";
import useStyles from "./styles.js";

const Posts = () => {
    const { posts, isLoading } = useSelector((state) => state.posts);
    const classes = useStyles();

    console.log("Posts:", posts);

    if (!posts.length && !isLoading) return 'No posts';
    
    return (
        isLoading ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {posts.map((post) => (
                    <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
                        <Post post={post} />
                    </Grid>
                ))}
            </Grid>
        )
    )
}

export default Posts;