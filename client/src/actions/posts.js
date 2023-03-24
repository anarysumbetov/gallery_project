import { FETCH_POST, FETCH_ALL, CREATE, START_LOADING, END_LOADING, UPDATE, DELETE, LIKE } from "../constants/actionTypes.js";
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

export const updatedPost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatedPost(id, post);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log("updatedPost error:", error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log("likePost error:", error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log("deletePost error:", error);
  }
};