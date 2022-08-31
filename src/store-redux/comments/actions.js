export default {
  loadComments: (_id) => {
    return async (dispatch, getState, services) => {
      dispatch({
        type: "comments/loadComments",
        payload: { comments: [], waiting: true },
      });

      try {
        const json = await services.api.request({
          url: `/api/v1/comments?search%5Bparent%5D=${_id}&limit=*&skip=0&fields=_id,text,dateCreate,author(profile(name)),parent(_id)`,
        });

        dispatch({
          type: "comments/loadComments-success",
          payload: { data: json.result?.items, waiting: false },
        });
      } catch (e) {
        // Ошибка при загрузке
        dispatch({
          type: "comments/loadComments-error",
          payload: { data: [], waiting: false },
        });
      }
    };
  },

  addComment: (_id, _type, text) => {
    return async (dispatch, getState, services) => {
      dispatch({
        type: "comments/waiting",
        payload: { waiting: true },
      });
      const articleId = getState().article.data._id;

      try {
        const json = await services.api.request({
          method: "POST",
          url: "/api/v1/comments?search%5Bparent%5D=${_id}&limit=*&skip=0&fields=_id,text,dateCreate,author(profile(name)),parent(_id)",
          body: JSON.stringify({
            text,
            parent: {
              _id,
              _type,
            },
          }),
        });

        const newArtId = await getState().article.data._id;
        // Если произойдет сетевая задержка и текщий товар в стейте будет изменен => не добавляем новый комментарий в стейт
        if (articleId !== newArtId) {
          dispatch({
            type: "comments/loadComments-success",
            payload: { waiting: false },
          });
        } else {
          dispatch({
            type: "comments/loadComments-success",
            payload: { data: [...getState().comments.data, json.result], newCommentId: json.result._id, waiting: false },
          });
        }

      } catch (e) {
        // Ошибка при загрузке
        dispatch({
          type: "article/loadComments-error",
          payload: { data: [], waiting: false },
        });
      }
    };
  },
};
