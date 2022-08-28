export default {
  load: (_id) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: "comments/load" });

      try {
        const json = await services.api.request({
          url: `api/v1/comments?search%5Bparent%5D=${_id}&limit=10&skip=0&fields=%2A,author(profile(name))`,
        });
        // Товар загружен успешно
        dispatch({
          type: "comments/load-success",
          payload: { data: json.result },
        });
      } catch (e) {
        // Ошибка при загрузке
        dispatch({ type: "comments/load-error" });
      }
    };
  },
  newComment: (text, parent_id, parentType) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: "comments/new" });

      try {
        const json = await services.api.request({
          url: `api/v1/comments/?fields=*,author(profile(name))`,
          method: "POST",
          body: JSON.stringify({
            text: text,
            parent: {
              _id: parent_id,
              _type: parentType,
            },
          }),
        });

        console.log("newjson", json);

        dispatch({
          type: "comments/new-success",
          payload: { data: json.result },
        });
      } catch (e) {
        dispatch({ type: "comments/new-error" });
      }
    };
  },
};
