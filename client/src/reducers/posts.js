import { CREATE, FETCH_ALL } from "../constants/actionTypes.js";

export default (posts = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return posts;
        case CREATE:
            return posts;
        default:
            return posts;
    }
}