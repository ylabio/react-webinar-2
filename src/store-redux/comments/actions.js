export default {

  load: function(_id) {
    return async (dispatch, getState, services) => {
      dispatch({type: 'comments/load',})

      try {
        const json = await services.api.request({url: `/api/v1/comments?search[parent]=${_id}&limit=*&fields=items(*,author(profile(name))),count`});

        // Комментарии загружены успешно
        dispatch({
          type: 'comments/load-success',
          payload: {
            items: json.result.items,
            count: json.result.count
          }
        });
      } catch (e) {
        // Ошибка при загрузке
        dispatch({type: 'comments/load-error', payload: {error: e.error.message}});
      }
    }
  },

  send: function(text, parentId, parentType) {
    return async (dispatch, getState, services) => {
      dispatch({type: 'comments/send', payload: {text, parentId}})

      try {
        const json = await services.api.request(
          {url: `/api/v1/comments`,
            method: 'POST',
            body: JSON.stringify({text: text, parent: {_id: parentId, _type: parentType}})});

        dispatch({
          type: 'comments/send-success',
          payload: {
            item: json.result
          }
        });

      } catch (e) {
        // Ошибка при отправке
        dispatch({type: 'comments/send-error', payload: {error: e.error.message}});
      }
    }
  },
}
