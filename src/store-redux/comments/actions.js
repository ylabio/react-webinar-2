export default {
  load: (id) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'comments/load' });

      try {
        const json = await services.api.request({
          url: `/api/v1/comments?search[parent]=${id}&fields=items(_id,_type,text,dateCreate,parent(_id, _type),author(profile(name))),count&limit=*`,
        });
        dispatch({
          type: 'comments/load-success',
          payload: { result: json.result },
        });
      } catch (e) {
        dispatch({ type: 'comments/load-error' });
      }
    };
  },

  reply: (id) => {
    return { type: 'comments/reply', payload: id };
  },

  send: (text, parentId, parentType) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'comments/send' });

      try {
        const json = await services.api.request({
          url: `/api/v1/comments/?fields=*,author(profile(name))`,
          method: 'POST',
          body: JSON.stringify({
            text,
            parent: {
              _id: parentId,
              _type: parentType,
            },
          }),
        });

        dispatch({
          type: 'comments/send-success',
          payload: { result: json.result },
        });
      } catch (e) {
        dispatch({ type: 'comments/send-error' });
      }
    };
  },
};
