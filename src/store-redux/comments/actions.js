export default {

  load: (_id) => {
    return async(dispatch, getState, services) => {
      dispatch({type: 'comments/load',})

      try {
        const json = await services.api.request({url: `/api/v1/comments?search[parent]=${_id}&limit=*&fields=items(*,author(profile(name))),count`});
        // Коментарии успешно загружены
        dispatch({type: 'comments/load-success', payload: {data: json.result}});
      } catch (e){
        // Ошибка при загрузке
        dispatch({type: 'comments/load-error'});
      }
    }
  },

  addComment: (text, _id, _type) => {
    return async(dispatch, getState, services) => {
      dispatch({type: 'comments/addComment',})
      try {
        const json = await services.api.request({
          method: 'POST',
          url: '/api/v1/comments?fields=*,author(profile(name))',
          body: JSON.stringify({
            text,
            parent: {
              _id,
              _type,
            }
          })
        })
        console.log('result2', json.result)
        // Коментарии успешно загружены
        dispatch({type: 'comments/addComment-success', payload: {data: json.result}});

      } catch (e){
        // Ошибка при загрузке
        dispatch({type: 'comments/addComment-error'});
      }
    }
  },

  resetCommentId: () => {
    console.log('тест')
    return {type: 'comments/resetCommentId'}
  }
}


