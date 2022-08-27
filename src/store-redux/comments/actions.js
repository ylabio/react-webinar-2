export default {
	load: (_id) => {
		return async (dispatch, getState, services) => {
			dispatch({type: 'comments/load'});

			try {
        const json = await services.api.request({url: `/api/v1/comments?search[parent]=${_id}&limit=*&fields=_id,dateCreate,text,parent(*),author(username)`});
        // Комментарии загружены успешно
        dispatch({type: 'comments/load-success', payload: json.result.items});

      } catch (e){
        // Ошибка при загрузке
        dispatch({type: 'comments/load-error'});
      }
		}
	}
}