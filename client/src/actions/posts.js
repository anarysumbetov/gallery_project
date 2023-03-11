import { FETCH_ALL } from "../constants/actionTypes.js";
import * as api from "../api/index.js";

export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();
        
        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
        console.log("getPosts error:", error);
    }
}