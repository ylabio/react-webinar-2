export default { 
  
  load(id) {
    return async(dispatch, getState, services) => {
       // Загрузка комментариев
      dispatch({type: 'comments/load'});
      try {
        const json = await services.api.request({url: `/api/v1/comments?search[parent]=${id}&fields=items(*, _id,text,dateCreate,author(profile(name)),parent(_id, _type))&limit=*` });
        const result = json.result;
        // Комментарии загружены успешно
        dispatch({type: 'comments/load-success', payload: {data: result}});
      } catch (e) {
        // Ошибка при загрузке
        dispatch({type: 'comments/load-error'});
      }
    }
  },

  addComment(text, parentId, parentType) {
    return async(dispatch, getState, services) => {
      dispatch({type: 'comments/add'});
      try {
        const json = await services.api.request({url: `/api/v1/comments`, 
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            text: text,
            parent: {
              _id: parentId,
              _type: parentType
            }
          })
        });

        const result = json.result;
        dispatch({type: 'comments/add-success', payload: {data: result}});
      } catch (e){
       // Ошибка при загрузке
       dispatch({type: 'comments/add-error'});
      }
    }   
  },

  attemptAddNewComment(newCommentText, parentIdNewComment, parentTypeNewComment) {
    return async(dispatch) => {
      dispatch({type: 'comments/attemptAddNewComment', payload: {newCommentText,  parentIdNewComment, parentTypeNewComment}});
    }
  }

}
