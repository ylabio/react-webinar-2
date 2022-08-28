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

  addComment: () => {},
};
