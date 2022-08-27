export default {

  load: (_id) => {
    return async(dispatch, getState, services) => {
      dispatch({type: 'article/load',})

      try {
        const json = await services.api.request({url: `/api/v1/articles/${_id}?fields=*,maidIn(title,code),category(title)`});
        // Товар загружен успешно
        dispatch({type: 'article/load-success', payload: {data: json.result}});

      } catch (e){
        // Ошибка при загрузке
        dispatch({type: 'article/load-error'});
      }
    }
  },

  loadComments: (_id) => {
    return async(dispatch, getState, services) => {
      dispatch({type: 'article/comments',})

      try {
        const json = await services.api.request({url: `/api/v1/comments/?id=${_id}?fields=*,_id,text,dateCreate,author(profile(name)),parent(_id)`});
        console.log(json.result.items)
        dispatch({type: 'article/comments-success', payload: {comments: json.result.items}});

      } catch (e){
        dispatch({type: 'article/comments-error'});
      }
    }
  },

  postComments: () => {

  }
}
