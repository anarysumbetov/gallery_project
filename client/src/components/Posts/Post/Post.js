import React, { useState } from "react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import { useDispatch } from "react-redux";
import moment from "moment";
import { useNavigate } from "react-router-dom";

import { likePost, deletePost } from "../../../actions/posts.js";
import useStyles from "./styles.js";

const Post = ({ post, setCurrentId }) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const postLikes = post === null || post === undefined ? undefined : post.likes;
    // it is the same like const postLikes = post?.likes;
    const [likes, setLikes] = useState(postLikes);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const classes = useStyles();

    const userResult = user === null || user === undefined ? undefined : user.result;
    // it is the same like const userResult = user?.result;
    const userResultId = userResult === null || userResult === undefined ? undefined : userResult._id;
    // it is the same like const userResultId = user?.reslut?._id;
    const userResultGoogleId = userResult === null || userResult === undefined ? undefined : userResult.googleId;
    // it is the same like const userResultGoogleId = user?.result?.googleId;
    const userId = userResultGoogleId || userResultId;
    const hasLikedPost = post.likes.find((like) => like === userId);

    const postCreator = post === null || post === undefined ? undefined : post.creator;
    // it is the same like const userResult = post?.creator;

    const handleLike = async () => {
        dispatch(likePost(post._id));

        if (hasLikedPost) {
            setLikes(post.likes.filter((id) => id !== userId));
        } else {
            setLikes([...post.likes, userId]);
        }
    };

    const Likes = () => {
        const likesLength = likes === null || likes === undefined ? undefined : likes.length;
        // it is the same like const likesLength = likes?.length;

        if (likesLength > 0) {
          return likes.find((like) => like === userId)
            ? (
              <><ThumbUpAltIcon fontSize="small" />&nbsp;{likesLength > 2 ? `You and ${likesLength - 1} others` : `${likesLength} like${likesLength > 1 ? 's' : ''}` }</>
            ) : (
              <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likesLength} {likesLength === 1 ? 'Like' : 'Likes'}</>
            );
        }
    
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    };

    const openPost = (e) => {

    };
    
    return (
        <Card className={classes.card} raised elevation={6}>
            <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
            <div className={classes.overlay}>
                <Typography variant="h6" >{post.name}</Typography>
                <Typography variant="body2" >{moment(post.createdAt).fromNow()}</Typography>
            </div>
            {(userResultGoogleId === postCreator || userResultId === postCreator) && (
                <div className={classes.overlay2} name="edit">
                    <Button
                        onClick={(e) => {
                            e.stopPropagation();
                            setCurrentId(post._id);
                        }}
                        style={{ color: 'white' }}
                        size="small"
                    >
                        <MoreHorizIcon fontSize="medium" />
                    </Button>
                </div>
            )}
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary" component="h2" >{post.tags.map((tag) => `#${tag} `)}</Typography>
            </div>
            <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">{post.message.split(' ').splice(0, 20).join(' ')}...</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" disabled={!userResult} onClick={handleLike}>
                    <Likes />
                </Button>
                {(userResultGoogleId === postCreator || userResultId === postCreator) && (
                    <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
                        <DeleteIcon fontSize="small" />
                        Delete
                    </Button>
                )}
            </CardActions>
        </Card>
    )
}

export default Post;