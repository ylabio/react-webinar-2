export default {

  load: (_id) => {
    return async(dispatch, getState, services) => {
      dispatch({type: 'article/load',})

      try {
        const json = await services.api.request({url: `/api/v1/articles/${_id}?fields=*,maidIn(title,code),category(title)`});
        // Товар загружен успешно
        const jsonСomments = await services.api.request({url: `/api/v1/comments?search%5Bparent%5D=${_id}&fields=items(*, author(profile(name))),count&limit=*`});
        // Комментарии загружены успешно
        dispatch({type: 'article/load-success', payload: {data: json.result}});
        dispatch({type: 'comments/load-success', payload: {comments: jsonСomments.result.items}});
        dispatch({type: 'commentsCount/load-success', payload: {commentsCount: jsonСomments.result.count}});

      } catch (e){
        // Ошибка при загрузке
        dispatch({type: 'article/load-error'});
        dispatch({type: 'comments/load-error'});
      }
    }
  },
}
