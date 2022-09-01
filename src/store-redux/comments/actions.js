export default {

  load: (_id) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'comments/load', })

      try {
        const json = await services.api.request({
          url: `/api/v1/comments?search[parent]=${_id}&limit=*&skip=0&fields=_id,text,dateCreate,author(profile(name)),parent(_id, _type)`
        });
        // Комментарии загружены успешно
        dispatch({ type: 'comments/load-success', payload: { data: json.result } });

      } catch (e) {
        // Ошибка при загрузке
        dispatch({ type: 'comments/load-error' });
      }
    }
  },

  addComment: (text, _id, _type = "article") => {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'comments/add-coment/load', })
      try {
        const json = await services.api.request({
          url: `/api/v1/comments?fields=_id,text,dateCreate,author(profile(name)),parent(_id, _type)`,
          method: "POST",
          body: JSON.stringify({
            text,
            parent: { _id, _type }
          })
        });
        // Комментарий отправлен успешно
        dispatch({ type: 'comments/add-coment/load-success', payload: { data: json.result } });
      } catch (e) {
        // Ошибка при загрузке
        dispatch({ type: 'comments/add-coment/load-error' });
      }
    }
  },

  changeNewComParent: (parent) => {
    return { type: "comments/newComment/change-parent", payload: { data: parent } }
  }
}
