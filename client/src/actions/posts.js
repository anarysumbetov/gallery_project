import { FETCH_POST, FETCH_ALL, CREATE, START_LOADING, END_LOADING } from "../constants/actionTypes.js";
import * as api from "../api/index.js";

export const getPost = (id) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
  
      const { data } = await api.fetchPost(id);
  
      dispatch({ type: FETCH_POST, payload: { post: data } });
    } catch (error) {
      console.log("getPost error:", error);
    }
  };

export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data: { data } } = await api.fetchPosts(page);
        
        dispatch({ type: FETCH_ALL, payload: { data } });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log("getPosts error:", error);
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.createPost(post);

        dispatch({ type: CREATE, payload: data });
    } catch (error) {
        console.log("createPost error:", error);
    }
}