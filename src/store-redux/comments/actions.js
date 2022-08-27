export default {
  
  load: (_id) => {
    return async(dispatch, getState, services) => {
      dispatch({type: 'comments/load'});

      try {
        const json = await services.api.request({
          url: `/api/v1/comments/?search[parent]=${_id}&limit=*&skip=0&fields=*,_id,text,dateCreate,author(profile(name)),parent(_id)`
        });
        dispatch({type: 'comments/load-success', payload: {data: json.result.items}});
      } catch (error) {
        dispatch({type: 'comments/load-error'});
      }
    } 
  },

  setCommentId: (id) => {
    return {type: 'comments/set-id', payload: {id}};
  },

  send: (data, id, type) => {
    return async (dispatch, getState, services) => {
      dispatch({type: 'comments/send'});

    try {
      await services.api.request({
        url: `/api/v1/comments`,
        method: 'POST',
        body: JSON.stringify({
          text: data,
          parent: {
            _id: id,
            _type: type,
          },
        }),
      });
      
      dispatch({type: 'comments/send-success'});
    } catch (error) {
      dispatch({type: 'comments/send-error'});
    }
    }
  }
}
