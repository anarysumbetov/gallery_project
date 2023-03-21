import { FETCH_ALL, CREATE } from "../constants/actionTypes.js";
import * as api from "../api/index.js";

export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();
        
        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
        console.log("getPosts error:", error);
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);

        dispatch({ type: CREATE, payload: data });
    } catch (error) {
        console.log("createPost error:", error);
    }
}