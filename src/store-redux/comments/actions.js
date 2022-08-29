export default {

  load: (_id) => {
    return async(dispatch, getState, services) => {
      dispatch({type: 'сomments/load',})

      try {
        const json = await services.api.request({url: `/api/v1/comments/?limit=*&search[parent]=${_id}&fields=_id,text,dateCreate,author(profile(name)),parent(_id)`});
        // Комментарии загружены успешно
        dispatch({type: 'сomments/load-success', payload: {data: json.result}});

      } catch (e){
        // Ошибка при загрузке
        dispatch({type: 'сomments/load-error'});
      }
    }
  },
}
