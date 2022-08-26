export default {

  load: (id) => {
    return async(dispatch, getState, services) => {
      dispatch({type: 'comments/load',})

      try {
        const json = await services.api.request({url: `/api/v1/comments?search[parent]=${id}&fields=items(*,author(profile(name))),count&sort=order&limit=*`});
        // Комментарии загружены успешно
        dispatch({type: 'comments/load-success', payload: {data: json.result}});

      } catch (e){
        // Ошибка при загрузке
        dispatch({type: 'comments/load-error'});
      }
    }
  },

  replyOpen: (id) => {
    return {type: 'comments/reply-open', payload: {data: id}}
  },

  sendComment: (text, parentId, parentType) => {
    return async(dispatch, getState, services) => {
      dispatch({type: 'comments/send',})

      try {
        const json = await services.api.request({
          url: `/api/v1/comments/?fields=*,author(profile(name))`,
          method: 'POST',
          body: JSON.stringify({
            text,
            parent: {
              _id: parentId,
              _type: parentType
            }
          })

        });

        dispatch({type: 'comments/send-success', payload: {data: json.result}});

      } catch (e){
        dispatch({type: 'comments/send-error'});
      }
    }
  }
}
