import React, { useEffect , useState} from "react";
import { Container, Grow, Grid, Paper } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import { getPosts } from "../../actions/posts.js";
import Posts from "../Posts/Posts.js";
import Form from "../Form/Form.js";
import Paginate from "../Pagination.jsx";
import useStyles from "./styles.js";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const classes = useStyles();
    const query = useQuery();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    
    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();

    const [tags, setTags] = useState([]);
    const navigate = useNavigate();
  
    useEffect(() => {
      dispatch(getPosts());
    }, [currentId, dispatch]);

    return (
        <Grow in>
            <Container>
                <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={7}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        {(!searchQuery && !tags.length) && (
                                <Paper className={classes.pagination} elevation={6}>
                                    <Paginate page={page} />
                                </Paper>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home;