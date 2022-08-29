import services from '../../services'

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
        const json = await services.api.request({url: `/api/v1/comments/?search[parent]=${_id}&fields=_id,text,dateCreate,author(profile(name)),parent(_id)&limit=*`});

        dispatch({type: 'article/comments-success', payload: {comments: json.result.items}});

      } catch (e){
        dispatch({type: 'article/comments-error'});
      }
    }
  },

  postComments: ({id, text, parent}) => {
    return async(dispatch, getState, services) => {
      const userToken = localStorage.getItem('token');
      const json = await services.api.request({
        url: `/api/v1/comments?fields=_id,text,dateCreate,author(profile(name)),parent(_id)`,
        method: 'POST',
        headers: {
          'X-Token': userToken,
        },
        body: JSON.stringify({id, text, parent})
      });

      dispatch({type: 'article/comments-add-success', payload: json.result});
    }
  }
}
