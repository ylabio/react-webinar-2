export default {
  load: (_id) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'comments/load' });

      try {
        const json = await services.api.request({
          url: `/api/v1/comments?search%5Bparent%5D=${_id}&limit=*&skip=0&fields=items(_id,text,_type,dateCreate,author(profile(name)),parent(_id,_type,_tree)),count`,
        });
        // Комментарии успешно загружены
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

  post: (body) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'comments/post' });
      try {
        const json = await services.api.request({
          url: `/api/v1/comments?fields=_id,text,dateCreate,author(profile(name)),parent(_id,_type)&lang=ru`,
          method: 'POST',
          body: JSON.stringify(body),
        });
        dispatch({
          type: 'comments/post-success',
          payload: { data: json.result },
        });
      } catch (e) {
        dispatch({ type: 'comments/post-error' });
      }
    };
  },
};
