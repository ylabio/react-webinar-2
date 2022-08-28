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
        const postJson = await services.api.request({
          url: `/api/v1/comments?fields=items(*,author(profile(name))),count&sort=order&limit=*`,
          method: 'POST',
          headers: {
            'X-Token': `${token}`,
          },
          body: JSON.stringify(body)
        });
        
        dispatch({type: 'comments/add-comment-success'});
        
        // Подгружаем новый список комментариев с новым добавленным комментарием
        try {
          const json = await services.api.request({url:
              `/api/v1/comments?search[parent]=${_id}&fields=items(*,author(profile(name))),count&sort=order&limit=*`});
    
          // Комментарий загружен успешно
          dispatch({type: 'comments/load-success', payload: {items: json.result.items, count: json.result.count}});
    
        } catch (e) {
          // Ошибка при загрузке
          dispatch({type: 'comments/load-error'});
        }
        
      } catch (e) {
        // Ошибка при загрузке
        dispatch({type: 'comments/add-comment-error'});
      }
    }
  },
}
