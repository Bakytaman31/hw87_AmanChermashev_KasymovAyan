import axiosApp from "../../axiosApp";
import { push } from 'connected-react-router'
import {getComments} from "./commentsActions";

export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
export const GET_POST_SUCCESS = 'GET_POST_SUCCESS';

export const getPostsSuccess = posts => ({type: GET_POSTS_SUCCESS, posts});
export const getPostSuccess = post => ({type: GET_POST_SUCCESS, post});

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
        const user = getState().users.user;
        await axiosApp.post('/posts', post, {headers: {'Authorization': 'Token ' + user.token}});
        await dispatch(getPosts());
        dispatch(push('/'));
    }
};