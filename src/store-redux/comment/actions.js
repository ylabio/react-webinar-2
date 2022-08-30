export default {

  load: (_id) => {
    return async(dispatch, getState, services) => {
      dispatch({type: 'comments/load',})

      try {
        const json = await services.api.request({url: `/api/v1/comments?search%5Bparent%5D=${_id}&fields=items(*, author(profile(name))),count&limit=*`});
        // Комментарии загружены успешно
        dispatch({type: 'comments/load-success', payload: {comments: json.result.items}});
        dispatch({type: 'commentsCount/load-success', payload: {commentsCount: json.result.count}});

      } catch (e){
        // Ошибка при загрузке
        dispatch({type: 'comments/load-error'});
      }
    }
  },
  increaseСount: (data) => {
    return async(dispatch, getState, services) => {
      try {
        const json = await services.api.request({
          method: 'POST',
          url: '/api/v1/comments',
          body: JSON.stringify(data)
        });
        
        if (!json.error) 
          dispatch({type: 'comment/increaseСount', payload: {countAddComment: 1}});

      } catch (e){
        dispatch({type: 'comment/increaseСount-error'});
      }
    } 
  },
}
