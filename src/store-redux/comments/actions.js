export default {
  load: (_id) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: "comments/load" });

      try {
        const json = await services.api.request({
          url: `/api/v1/comments?search%5Bparent%5D=${_id}&limit=*&skip=0&fields=items(_id,text,_type,dateCreate,author(profile(name)),parent(_id,_type,_tree)),count`,
        });
        // Товар загружен успешно
        dispatch({
          type: "comments/load-success",
          payload: { data: json.result.items, count: json.result.count },
        });
      } catch (e) {
        // Ошибка при загрузке
        dispatch({ type: "comments/load-error" });
      }
    };
  },
  post: (parentId, text, parentType) => {
    return async (dispatch, getState, services) => {
      dispatch({
        type: "comments/post",
      });
      try {
        const json = await services.api.request({
          url: `/api/v1/comments?fields=*,author(profile(name))`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: text,
            parent: { _id: parentId, _type: parentType },
          }),
        });
        dispatch({
          type: "comments/post-success",
          payload: { data: json.result },
        });
      } catch (e) {
        dispatch({ type: "comments/post-error" });

        // Ошибка при загрузке
      }
    };
  },
};
