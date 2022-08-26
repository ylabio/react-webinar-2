export default {

  load: (_id) => {
    return async(dispatch, getState, services) => {
      dispatch({type: 'comments/load',})

      try {
        const json = await services.api.request({url: `/api/v1/comments?limit=*&fields=*,author(username)&search[parent]=${_id}`});
        // Комментарий загружен успешно
        dispatch({type: 'comments/load-success', payload: {data: json.result}});

      } catch (e){
        // Ошибка при загрузке
        dispatch({type: 'comments/load-error'});
      }
    }
  },
}
