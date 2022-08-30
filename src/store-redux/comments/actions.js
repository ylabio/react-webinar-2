export default {

  loadComments: (_id) => {
    return async(dispatch, getState, services) => {
      dispatch({type: 'comment/load',})

      try {
        const json = await services.api.request({url: `/api/v1/comments/?search[parent]=${_id}&fields=_id,dateCreate,text,author(profile(name)),parent(_id, _tree)&limit=*`});
        // Товар загружен успешно
        dispatch({type: 'comment/load-success', payload: {data: json.result.items}});

      } catch (e){
        // Ошибка при загрузке
        dispatch({type: 'comment/load-error'});
      }
    }
  },
}
