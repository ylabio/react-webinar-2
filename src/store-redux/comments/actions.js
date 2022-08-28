export default {

  load: (post_id) => {
    return async(dispatch, getState, services) => {
      dispatch({type: 'comments/load',})

      try {
        const json = await services.api.request({url: `/api/v1/comments?search[parent]=${post_id}&limit=*&fields=items(*,author(profile(name))),count`});
        dispatch({type: 'comments/load-success', payload: {data: json.result}});

      } catch (e){
        dispatch({type: 'comments/load-error'});
      }
    }
  },

  post: function(text, parent_id, parentType) {
    return async(dispatch, getState, services) => {
      dispatch({type: 'comments/push',})

      try {
        const json = await services.api.request({
          url: `/api/v1/comments?fields=*,author(profile(name))`, 
          method: 'POST',
          body: JSON.stringify({
            text: text, 
            parent: {_id: parent_id, _type: parentType}
          })
        })
        dispatch({type: 'comments/post-success', payload: {data: json.result}});

      } catch (e) {
        dispatch({type: 'comments/post-error'});
      }
    }
  }
}
