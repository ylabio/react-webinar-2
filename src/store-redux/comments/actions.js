export default {
  load: (articleId) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: "comments/load" });

      try {
        const json = await services.api.request({
          url: `/api/v1/comments?search%5Bparent%5D=${articleId}&limit=*&fields=items(*,author(profile(name))),count`,
        });
        // Комментарии загружены успешно
        dispatch({
          type: "comments/load-success",
          payload: { items: json.result.items, count: json.result.count },
        });
      } catch (e) {
        // Ошибка при загрузке
        dispatch({ type: "comments/load-error", payload: { error: e } });
      }
    };
  },
  post: (authToken, text, id, type) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: "comments/load" });

      try {
        const json = await services.api.request({
          url: `/api/v1/comments?lang=ru&fields=*,author(*)`,
          method: "POST",
          headers: {
            "X-Token": `${authToken}`,
          },
          body: JSON.stringify({
            text: `${text}`,
            parent: {
              _id: id,
              _type: type,
            },
          }),
        });
        // // Комментарий добавлен успешно
        dispatch({
          type: "comments/post-success",
          payload: json.result,
        });
      } catch (e) {
        // Ошибка при загрузке
        dispatch({ type: "comments/post-error", payload: { error: e } });
      }
    };
  },
  replyToComment: (id) => {
    return (dispatch) => {
      dispatch({ type: "comments/post-replying", payload: { id } });
    };
  },

  stopReply: () => {
    return (dispatch) => {
      dispatch({ type: "comments/stop-replying" });
    };
  },
};
