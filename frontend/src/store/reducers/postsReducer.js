import {GET_POST_SUCCESS, GET_POSTS_SUCCESS, SEND_POST_FAILURE, SEND_POST_SUCCESS} from "../actions/postsActions";

const initialState = {
    posts: [],
    post: null,
    error: null
};

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POSTS_SUCCESS:
            return {...state, posts: action.posts};
        case GET_POST_SUCCESS:
            return {...state, post: action.post};
        case SEND_POST_FAILURE:
            return {...state, error: action.error};
        case SEND_POST_SUCCESS:
            return {...state, error: null};
        default:
            return state;
    }
};

export default postsReducer;