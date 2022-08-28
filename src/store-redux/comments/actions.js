export default {

  load: (_id) => {
    return async(dispatch, getState, services) => {
      dispatch({type: 'comments/load',})

      try {
        const json = await services.api.request({url:
          `/api/v1/comments?search[parent]=${_id}&limit=*&fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type)),count&lang=ru`
        });
        // Комментарии загружены успешно
        dispatch({type: 'comments/load-success', payload: {data: json.result}});

      } catch (e){
        // Ошибка при загрузке
        dispatch({type: 'comments/load-error'});
      }
    }
  },

  create: ({text, type, parentId}) => {
    return async(dispatch, getState, services) => {
      dispatch({type: 'comments/load',})

      const body = {text: text, parent: {_id: parentId, _type: type}}
      try {
        const json = await services.api.request({
          url: `/api/v1/comments?fields=_id,text,dateCreate,author(profile(name)),parent(_id,_type)&lang=ru`, 
          method: "POST", 
          headers: {'Content-Type': 'application/json'}, 
          body: JSON.stringify(body)
        });
        // Коментарий создан успешно
        dispatch({type: 'comments/create-success', payload: {data: json.result}});

      } catch (e){
        // Ошибка при добавлении комментария
        dispatch({type: 'comments/create-error'});
      }
    }
  },
}
