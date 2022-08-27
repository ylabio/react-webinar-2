export default {
  load: (_id) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: "article/load", payload: { data: {}, waiting: true } });

      try {
        const json = await services.api.request({
          url: `/api/v1/articles/${_id}?fields=*,maidIn(title,code),category(title)`,
        });
        // Товар загружен успешно
        dispatch({
          type: "article/load-success",
          payload: { data: json.result, waiting: false },
        });
      } catch (e) {
        // Ошибка при загрузке
        dispatch({
          type: "article/load-error",
          payload: { data: {}, waiting: false },
        });
      }
    };
  },

  loadComments: (_id) => {
    return async (dispatch, getState, services) => {
      dispatch({
        type: "article/loadComments",
        payload: { comments: [], waiting: true },
      });

      try {
        const json = await services.api.request({
          url: `/api/v1/comments?search%5Bparent%5D=${_id}&limit=*&skip=0&fields=_id,text,dateCreate,author(profile(name)),parent(_id)`,
        });

        dispatch({
          type: "article/loadComments-success",
          payload: { comments: json.result?.items, waiting: false },
        });
      } catch (e) {
        // Ошибка при загрузке
        dispatch({
          type: "article/loadComments-error",
          payload: { comments: [], waiting: false },
        });
      }
    };
  },

  addComment: (_id, _type, text) => {
    return async (dispatch, getState, services) => {
      
      dispatch({
        type: "article/waiting",
        payload: { waiting: true },
      });

      const articleId = getState().article.data._id

      try {
        const json = await services.api.request({
          method: "POST",
          url: "/api/v1/comments",
          body: JSON.stringify({
            text,
            parent: { 
              _id,
              _type,
           },
          }),
        });

        const comments = await services.api.request({
          url: `/api/v1/comments?search%5Bparent%5D=${articleId}&limit=*&skip=0&fields=_id,text,dateCreate,author(profile(name)),parent(_id)`,
        });

        dispatch({
          type: "article/loadComments-success",
          payload: { comments: comments.result?.items, waiting: false },
        });

      } catch (e) {
        // Ошибка при загрузке
        // dispatch({type: 'article/loadComments-error', payload: {comments: [], waiting: false}});
      }
    };
  },

  setWaiting: (waiting) => {
    dispatch({type: 'article/waiting', payload: { waiting }})
  }
};
