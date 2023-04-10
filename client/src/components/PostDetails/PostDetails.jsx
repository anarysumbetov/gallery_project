import React, { useEffect } from "react";
import { Paper, Typography, CircularProgress, Divider } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";

import { getPost, getPostsBySearch } from "../../actions/posts.js";
import CommentSection from "./CommentSection.jsx";
import useStyles from "./styles.js";

const PostDetails = () => {
  const statePosts = (state) => (
    state === null || state === undefined ? undefined : state.posts
    // it is the same like useSelector((state) => state?.posts);
  )
  const { post, posts, isLoading } = useSelector(statePosts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const { id } = useParams(); 

  const postTitle = post === null || post === undefined ? undefined : post.title;
  // it is the same like const postTitle = post?.title;
  const postTags = post === null || post === undefined ? undefined : post.tags;
  // it is the same like const postTags = post?.tags;
  const postTagsMap = postTags === null || postTags === undefined ? undefined : postTags.map((tag) => `#${tag} `);
  // it is the same like const postTagsMap = post?.tags?.map((tag) => `#${tag} `));
  const postMessage = post === null || post === undefined ? undefined : post.message;
  // it is the same like const postMessage = post?.message;
  const postName = post === null || post === undefined ? undefined : post.name;
  // it is the same like const postName = post?.name;
  const postCreatedAt = post === null || post === undefined ? undefined : post.createdAt;
  // it is the same like const postCreatedAt = post?.createdAt;
  const postSelectedFile = post === null || post === undefined ? undefined : post.selectedFile;
  // it is the same like const postSelectedFile = post?.selectedFile;

  useEffect(() => {
    //dispatch means give data to reducer
    dispatch(getPost(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (post) {
      dispatch(getPostsBySearch({ search: 'none', tags: postTags.join(',') }));
    }
  }, [post, dispatch]);

  if (!post) return null; 

  const openPost = (_id) => navigate(`/posts/${_id}`);

  if (isLoading) {
      return (
          <Paper elevation={6} className={classes.loadingPaper}>
              <CircularProgress size="7em" />
          </Paper>
      );
  }

  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.card}>
          <div className={classes.section}>
              <Typography variant="h3" component="h2">{postTitle}</Typography>
              <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{postTagsMap}</Typography>
              <Typography gutterBottom variant="body1" component="p">{postMessage}</Typography>
              <Typography variant="h6">Created by: {postName}</Typography>
              <Typography variant="body1">{moment(postCreatedAt).fromNow()}</Typography>
              <Divider style={{ margin: '20px 0' }} />
              <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
              <Divider style={{ margin: '20px 0' }} />
              <CommentSection post={post} />
              <Divider style={{ margin: '20px 0' }} />
          </div>
          <div className={classes.imageSection}>
              <img className={classes.media} src={postSelectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={postTitle} />
          </div>
      </div>
      {!!recommendedPosts.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">You might also like:</Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {recommendedPosts.map(({ title, name, message, likes, selectedFile, _id }) => (
                <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id}>
                    <Typography gutterBottom variant="h6">{title}</Typography>
                    <Typography gutterBottom variant="subtitle2">{name}</Typography>
                    <Typography gutterBottom variant="subtitle2">{message}</Typography>
                    <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                    <img src={selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} width="200px" alt="selectedFile" />
                </div>
            ))}
          </div>
        </div>
      )}
    </Paper>
  )
}

export default PostDetails;