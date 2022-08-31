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
  post: ({
    postId,
    parentCommentId, 
    text
  }) => {
    return async(dispatch, getState, services) => {
      try {
        const body_ = {
          text,
          parent: {
            _id: parentCommentId || postId,
            _type: parentCommentId ? 'comment' : 'article'
          }
        }
        const json = await services.api.request({
          url: `/api/v1/comments?fields=*,author(profile(name))`,
          method: 'POST',
          body: JSON.stringify(body_)
        })
        dispatch({type: 'comments/post-success', payload: {data: json.result}});

      } catch (e){
        // Ошибка при загрузке
        dispatch({type: 'comments/post-error'});
      }
      
    }
  }
}