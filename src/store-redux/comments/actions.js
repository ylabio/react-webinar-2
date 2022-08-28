export default {
  load: (id) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'comments/load' });

      try {
        const json = await services.api.request({
          url: `/api/v1/comments?search[parent]=${id}&fields=_id,text,dateCreate,parent,author(profile(name))&limit=*`,
        });
        dispatch({ type: 'comments/load-success', payload: { data: json.result.items } });
      } catch (e) {
        dispatch({ type: 'comments/load-error' });
      }
    };
  },
  createComment: (data) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'comments/send-start' });
      try {
        const json = await services.api.request({
          url: `/api/v1/comments?fields=_id,text,dateCreate,author(profile(name)),parent(_id)`,
          method: 'POST',
          body: JSON.stringify(data),
        });
        dispatch({ type: 'comments/send-success', payload: { data: json.result } });
      } catch (e) {
        dispatch({ type: 'comments/send-error' });
      }
    };
  },
};
