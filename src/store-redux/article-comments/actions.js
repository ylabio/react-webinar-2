export default {

  load: (_id) => {
    return async(dispatch, getState, services) => {
      dispatch({type: 'article-comments/load',})

      try {
        const json = await services.api.request({
          url: `/api/v1/comments?search[parent]=${_id}&fields=items(*,author(profile(name))),count&sort=order&limit=*&skip=0`
        });
        dispatch({type: 'article-comments/load-success', payload: {data: json.result}});

      } catch (e){
        dispatch({type: 'article-comments/load-error'});
      }
    }
  },

  submitComment: (id, type, text) => {
    return async(dispatch, getState, services) => {
      dispatch({type: "article-comments/push",})

      try {
        const json = await services.api.request({
          url: `/api/v1/comments?fields=*,author(profile(name))`,
          method: 'POST',
          body: JSON.stringify({
            text: text,
            parent: {
              _id: id,
              _type: type
            }
          })
        });

        dispatch({type: "article-comments/push-complited", payload: {data: json.result}});

      } catch (e){
        dispatch({type: "article-comments/push-error"});
      }
    }
  }
}
  