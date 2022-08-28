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
};
