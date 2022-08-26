export default {

  load: (_id) => {
    return async(dispatch, getState, services) => {
      dispatch({type: 'comments/load',})

      let json;
      try {
        json = await services.api.request(
          {url: `/api/v1/comments?search[parent]=${_id}&limit=*&skip=0&fields=items(*,author(*)),count`}
        );
        // Товар загружен успешно
        dispatch({
          type: 'comments/load-success',
          payload:
            {
              data: json.result.items,
              count: json.result.count
            }
        });
      } catch (e){
        // Ошибка при загрузке
        dispatch({type: 'comments/load-error', payload: {error: json._result}});
      }
    }
  },
  addComment: (token, body) => {
    return async(dispatch, getState, services) => {
      dispatch({type: 'comments/add-comment',})

      let json;

      try {
        json = await services.api.request({
          url: `/api/v1/comments?lang=ru&fields=*,author(*)`,
          method: 'POST',
          headers: {
            'X-Token': `${token}`,
          },
          body: JSON.stringify(body),
        });

        dispatch({type: 'comments/add-comment-success', payload: json.result})

      } catch (e){
        // Ошибка при загрузке
        dispatch({type: 'comments/add-comment-error', payload: {error: json._result}});
      }
    }
  },

  answerComment: (id) => {
    return (dispatch, getState, services) => {
      dispatch({type: 'comments/answer', payload: id});
    }
  },

  closeComment: (id) => {
    return (dispatch, getState, services) => {
      dispatch({type: 'comments/close', payload: id});
    }
  },

  onHide: (id) => {
    return (dispatch, getState, services) => {
      dispatch({type: 'comments/hide', payload: id});
    }
  }
}