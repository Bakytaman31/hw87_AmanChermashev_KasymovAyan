import {GET_POST_SUCCESS, GET_POSTS_SUCCESS} from "../actions/postsActions";

const initialState = {
    posts: [],
    post: null
};

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POSTS_SUCCESS:
            return {...state, posts: action.posts};
        case GET_POST_SUCCESS:
            return {...state, post: action.post};
        default:
            return state;
    }
};

export default postsReducer;