const actions = {

  load: (_id) => {
    return async(dispatch, getState, services) => {
      dispatch({type: 'comments/load'})
      try {
        const json = await services.api.request({url: `/api/v1/comments/?search[parent]=${_id}&limit=*&skip=0&fields=items(_id,_type,text,dateCreate,author(profile(name)),parent(_id,_type)),count`});
        // Комментарии загружен успешно
        dispatch({type: 'comments/load-success', payload: {data: json.result}});
      } catch (e){
        // Ошибка при загрузке
        dispatch({type: 'comments/load-error'});
      }
    }
  },

  openAnswer: (id) => {
    return {type: 'comments/answer', id}
  },

  add: (data) => {
    return async(dispatch, getState, services) => {
      dispatch({type: 'comments/add'});
      try {
        // Создаем новый комментарий
        const comment = {
          text: data.text,
          parent: {
            _id: data.parent._id,
            _type: data.parent._type
          } 
        }
        const response = await services.api.request({url: `/api/v1/comments`, method: "POST", 
        body: JSON.stringify(comment)});
        // Успешно отправлен
        const post = {...response.result, author: {profile:{name: data.userName}}}
        dispatch({type: 'comments/add-success', payload: post})
        // Загружаем комментарии для обновления статуса
        // dispatch(actions.load(data.parentArticleId));
      } catch (e){
        // Ошибка при загрузке
        dispatch({type: 'comments/add-error'});
      }
    }
  },
}
export default actions;
