export default {
  
  load: (_id) => {
    return async (dispatch, getState, services) => {
      dispatch({type: 'comments/load',})
      
      try {
        const json = await services.api.request({url:
            `/api/v1/comments?search[parent]=${_id}&fields=items(*,author(profile(name))),count&sort=order&limit=*`});
        
        // Товар загружен успешно
        dispatch({type: 'comments/load-success', payload: {items: json.result.items, count: json.result.count}});
        
      } catch (e) {
        // Ошибка при загрузке
        dispatch({type: 'comments/load-error'});
      }
    }
  },
  post: (text, parentId, parentType, token) => {
    return async (dispatch, getState, services) => {
      dispatch({type: 'comments/add-comment',})

      try {
        const body = {
          text,
          parent: {
            _id: parentId,
            _type: parentType
          }
        }
        const postJson = await services.api.request({
          url: `/api/v1/comments?fields=items(*,author(profile(name))),count&sort=order&limit=*`,
          method: 'POST',
          headers: {
            'X-Token': `${token}`,
          },
          body: JSON.stringify(body)
        });
        
      } catch (e) {
        // Ошибка при загрузке
        dispatch({type: 'comments/add-comment-error'});
      }
    }
  },
}
