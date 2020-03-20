import {GET_COMMENTS_SUCCESS} from "../actions/commentsActions";

const initialState = {
    comments: []
};

const commentsReducer = (state = initialState, action) => {
    if (action.type === GET_COMMENTS_SUCCESS) {
        return {...state, comments: action.comments}
    } else {
        return state;
    }
};

export default commentsReducer;