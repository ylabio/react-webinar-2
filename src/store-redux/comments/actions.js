export default {

  // Получение всех комментариев товара
  load: (_id) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'comments/load', })

      try {
        const json = await services.api.request({ url: `/api/v1/comments?search[parent]=${_id}&fields=items(*,author(profile(name))),count&limit=*` });
        // Комментрии загружены успешно
        dispatch({ type: 'comments/load-success', payload: { data: json.result } });
        console.log(json.result)

      } catch (e) {
        // Ошибка при загрузке
        dispatch({ type: 'commets/load-error' });
      }
    }
  },

  // Загрузка нового комментария под товаром
  post: (text, idParent, type) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'comments/post', })

      try {
        const json = await services.api.request({
          url: '/api/v1/comments',
          method: 'POST',
          body: JSON.stringify({ text: text, parent: { _id: idParent, _type: type } })
        });
        // Комментрий загружен успешно
        dispatch({ type: 'comments/post-success', payload: { item: json.result } });

      } catch (e) {
        // Ошибка при загрузке
        dispatch({ type: 'commets/post-error' });
      }
    }
  },
}
