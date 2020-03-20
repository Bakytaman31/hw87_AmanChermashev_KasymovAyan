import axiosApp from "../../axiosApp";

export const GET_COMMENTS_SUCCESS = 'GET_COMMENTS_SUCCESS';

export const getCommentSuccess = comments =>({type: GET_COMMENTS_SUCCESS, comments});

export const getComments = id => {
  return async (dispatch, getState) => {
      const user = getState().users.user;
      const response = await axiosApp.get(`comments/${id}`, {headers: {'Authorization': 'Token ' + user.token}});
      dispatch(getCommentSuccess(response.data));
  }
};

export const postComment = (comment, id) => {
    return async (dispatch, getState) => {
        const user = getState().users.user;
        await axiosApp.post(`/comments`, comment, {headers: {'Authorization': 'Token ' + user.token}});
        dispatch(getComments(id));
    }
};