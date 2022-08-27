export default {

  load: (_id) => {
    return async(dispatch, getState, services) => {
      dispatch({type: 'comments/load',})
      try {
        const json = await services.api.request({url: `/api/v1/comments/?search[parent]=${_id}&limit=10&skip=0&fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type)),count`});
        // Комментарии загружен успешно
        dispatch({type: 'comments/load-success', payload: {data: json.result}});
      } catch (e){
        // Ошибка при загрузке
        dispatch({type: 'comments/load-error'});
      }
    }
  },

  add: (data) => {
    return async(dispatch, getState, services) => {
      dispatch({type: 'comments/add'});
      try {
        const comment = {
          // "_id":  '1',
          "text": data.text,
          "parent": data.parent,
        }
        const json = await services.api.request({url: `/api/v1/comments`, method: "POST", 
          body: JSON.stringify(comment)});
        // Комментарии загружен успешно
        dispatch({type: 'comments/add-success', payload: {data: comment}});

      } catch (e){
        // Ошибка при загрузке
        dispatch({type: 'comments/add-error'});
      }
    }
  },
}
