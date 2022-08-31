export default {
  
  load: (_id) => {
    return async (dispatch, getState, services) => {
      dispatch({type: 'comments/load',})
      
      try {
        const json = await services.api.request({url:
            `/api/v1/comments?search[parent]=${_id}&fields=items(*,author(profile(name))),count&sort=order&limit=*`});
        
        // Комментарии загружены успешно
        dispatch({type: 'comments/load-success', payload: {items: json.result.items, count: json.result.count}});
        
      } catch (e) {
        // Ошибка при загрузке
        dispatch({type: 'comments/load-error'});
      }
    }
  },
  post: (text, parentId, parentType, token, _id) => {
    return async (dispatch, getState, services) => {
      dispatch({type: 'comments/add-comment',})

      try {
        // Формеруем тело запроса
        const body = {
          text,
          parent: {
            _id: parentId,
            _type: parentType
          }
        }
        
        // Отправляем новый комменатрий на бек
        const json = await services.api.request({
          url: `/api/v1/comments?fields=*,author(profile(name))`,
          method: 'POST',
          headers: {
            'X-Token': `${token}`,
          },
          body: JSON.stringify(body)
        });
        
        // Добавляем новый коментарий на фронт
        dispatch({type: 'comments/add-comment-success', payload: {newItem: json.result}});
        
      } catch (e) {
        // Ошибка при загрузке
        dispatch({type: 'comments/add-comment-error'});
      }
    }
  },
}
