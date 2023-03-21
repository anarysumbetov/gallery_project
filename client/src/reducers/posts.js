import { FETCH_POST, CREATE, FETCH_ALL, START_LOADING, END_LOADING } from "../constants/actionTypes.js";

export default (state = { isLoading: true, posts: [] }, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true };
        case END_LOADING:
            return { ...state, isLoading: false };
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,  
            };
        case FETCH_POST:
            return { ...state, post: action.payload.post };
        case CREATE:
            return { ...state, posts: [...state.posts, action.payload] };
        default:
            return state;
    }
}