export default {

  send: (data) => {
    return async(dispatch, getState, services) => {
      dispatch({type: 'сomment/sending',})
      try {
      const json = await services.api.request({
        method: 'POST',
        url: '/api/v1/comments',
        body: JSON.stringify(data)
      });
      if (json.error) {
        dispatch({type: 'сomment/sending-error', payload: {errors: json.error}});
      }
        // Комментарии посланы успешно
        dispatch({type: 'сomment/sending-success'});

      } catch (e){
        // Ошибка при загрузке
        dispatch({type: 'сomment/sending-error'});
      }
    }
  },
}
