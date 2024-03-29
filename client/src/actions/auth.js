import { AUTH } from "../constants/actionTypes.js";
import * as api from "../api/index.js";

export const signin = (formData, router) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);

        dispatch({ type: AUTH, data });

        router('/');
    } catch (error) {
        console.log("signin error:", error);
    }
}

export const signup = (formData, router) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);

        dispatch({ type: AUTH, data });

        router('/');
    } catch (error) {
        console.log("signup error:", error);
    }
}