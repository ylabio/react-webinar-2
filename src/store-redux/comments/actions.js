export default {

  load: (_id) => {
    return async (dispatch, getState, services) => {
      dispatch({type: 'comments/load',});

      try {
        const json = await services.api.request({url: `/api/v1/comments?search[parent]=${_id}&fields=items(*,author(profile(name))),count&sort=order&limit=*`});
        // Успешно
        dispatch({type: 'comments/load-success', payload: {items: json.result.items, count: json.result.count}});
      } catch (e) {
        // Ошибка
        dispatch({type: 'comments/load-error'});
      }
    }
  },
  createComment: (text, id, type, token, _id) => {
    return async (dispatch, getState, services) => {
      dispatch({type: 'comments/add-comment',});

      try {
        await services.api.request({
          url: `/api/v1/comments?fields=items(*,author(profile(name))),count&sort=order&limit=*`,
          method: 'POST',
          headers: {
            'X-Token': `${token}`,
          },
          body: JSON.stringify({text, parent: {_id: id, _type: type}})
        });

        dispatch({type: 'comments/add-comment-success'});

        const json = await services.api.request({url:`/api/v1/comments?search[parent]=${_id}&fields=items(*,author(profile(name))),count&sort=order&limit=*`});
        dispatch({type: 'comments/load-success', payload: {items: json.result.items, count: json.result.count}});


      } catch (e) {
        // Ошибка
        dispatch({type: 'comments/add-comment-error'});
      }
    }
  },
}