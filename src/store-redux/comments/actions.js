export default {
  load: (_parentId) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'comments/load' });

      try {
        const json = await services.api.request({
          url: `/api/v1//comments?search[parent]=${_parentId}&limit=*&fields=items(*,author(profile(name))),count`,
        });

        dispatch({
          type: 'comments/load-success',
          payload: { data: json.result.items, count: json.result.count },
        });
      } catch (e) {
        // Ошибка при загрузке
        dispatch({ type: 'comments/load-error' });
      }
    };
  },

  addComment: (_parentId, _userId, text, parentType) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'comments/load' });

      try {
        const json = await services.api.request({
          url: `/api/v1/comments?fields=*,author(profile(name)),count`,
          method: 'POST',
          headers: { 'X-Token': localStorage.getItem('token') },
          body: JSON.stringify({
            author: {
              _id: _userId,
            },
            text,
            parent: {
              _id: _parentId,
              _type: parentType,
            },
          }),
        });

        const commentsState = getState().comments;
        dispatch({
          type: 'comments/load-success',
          payload: {
            data: [...commentsState.data, json.result],
            count: commentsState.count + 1,
          },
        });
      } catch (e) {
        // Ошибка при загрузке
        dispatch({ type: 'comments/load-error' });
      }
    };
  },

  changeCurrentOpenForm: (flag, commentId = null) => ({
    type: 'comments/change-current-open-form',
    payload: { currentOpenForm: flag ? commentId : '' },
  }),
};
