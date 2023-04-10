import * as actionType from "../constants/actionTypes.js";

const authReducer = (state = { authData: null }, action) => {
    const actionData = action === null || action === undefined ? undefined : action.data;
    // it is the same like const token = action?.data;

    switch (action.type) {
        case actionType.AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...actionData }));

            return { ...state, authData: actionData };
        case actionType.LOGOUT:
            localStorage.clear();
            
            return { ...state, authData: null };
        default:
            return state;
    }
}

export default authReducer;