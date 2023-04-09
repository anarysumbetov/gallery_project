import React, { useState, useRef } from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";

import { commentPost } from "../../actions/posts.js";
import useStyles from "./styles.js";

const CommentSection = ({ post }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const postComments = post === null || post === undefined ? undefined : post.comments;
  // it is the same like const postComments = post?.comments;
  const [comments, setComments] = useState(postComments);
  const classes = useStyles();
  const commentsRef = useRef();

  const userResult = user === null || user === undefined ? undefined : user.result;
  // it is the same like const userResult = user?.result;
  const userResultName = userResult === null || userResult === undefined ? undefined : userResult.name;
  // it is the same like const userResultName = user?.result?.name;
  const commentsMap = comments === null || comments === undefined ? undefined : comments.map((c, i) => (
      <Typography key={i} gutterBottom variant="subtitle1">
        <strong>{c.split(': ')[0]}</strong>
        {c.split(':')[1]}
      </Typography>
    )); 
  // it is the same like comments?.map((c, i) => ...

  const handleComment = async () => {
    const finalComment = `${userResultName}: ${comment}`;

    const newComments = await dispatch(commentPost(finalComment, post._id));

    setComment('');
    setComments(newComments);
  }

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">Comments</Typography>
          {commentsMap}
          <div ref={commentsRef} />
        </div>
        {userResultName && (
          <div style={{ width: '70%' }}>
            <Typography gutterBottom variant="h6">Write a comment</Typography>
            <TextField 
              fullWidth
              minRows={4}
              variant="outlined"
              label="Comment"
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <br />
            <Button 
              style={{ marginTop: '10px' }}
              fullWidth
              disabled={!comment.length}
              color="primary"
              variant="contained"
              onClick={handleComment}
            >
              Comment
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default CommentSection;