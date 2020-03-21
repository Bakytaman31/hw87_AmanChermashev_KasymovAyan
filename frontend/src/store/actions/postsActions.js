import axiosApp from "../../axiosApp";
import { push } from 'connected-react-router'
import {getComments} from "./commentsActions";

export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
export const GET_POST_SUCCESS = 'GET_POST_SUCCESS';

export const SEND_POST_SUCCESS = 'SEND_POST_SUCCESS';
export const SEND_POST_FAILURE = 'SEND_POST_FAILURE';

export const getPostsSuccess = posts => ({type: GET_POSTS_SUCCESS, posts});
export const getPostSuccess = post => ({type: GET_POST_SUCCESS, post});
export const sendPostFailure = error => ({type: SEND_POST_FAILURE, error});
export const sendPostSuccess = () => ({type: SEND_POST_SUCCESS});

export const getPosts = () => {
    return async dispatch => {
        const response = await axiosApp.get('/posts');
        dispatch(getPostsSuccess(response.data));
    }
};

export const getPost = id => {
    return async dispatch => {
        const response = await axiosApp.get(`/posts/${id}`);
        dispatch(getPostSuccess(response.data));
        dispatch(getComments(id));
    }
};

export const sendPost = post => {
    return async (dispatch, getState) => {
        try {
            const user = getState().users.user;
            await axiosApp.post('/posts', post, {headers: {'Authorization': 'Token ' + user.token}});
            await dispatch(getPosts());
            dispatch(sendPostSuccess());
            dispatch(push('/'));
        } catch (error) {
            console.log(error.response);
            dispatch(sendPostFailure(error.response.data.message))
        }
    }
};