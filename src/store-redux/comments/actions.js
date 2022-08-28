export default {

    load: (_id) => {
      return async(dispatch, getState, services) => {
        dispatch({type: 'comments/load'})
  
        try {
          const json = await services.api.request({url: `/api/v1/comments?limit=*&fields=*,author(profile)&search[parent]=${_id}`});
          // Комментарий загружен успешно
          dispatch({type: 'comments/load-success', payload: {data: json.result}});
  
        } catch (e){
          // Ошибка при загрузке
          dispatch({type: 'comments/load-error'});
        }
      }
    },
  
    send: (data) => {
      return async(dispatch, getState, services) => {
        dispatch({type: 'comments/send'})
  
        try {
          const json = await services.api.request({
            method: 'POST',
            url: `/api/v1/comments`,
            ContentType: 'application/json',
            body: JSON.stringify(data)
          });
          // Комментарий отправлен успешно
          dispatch({type: 'comments/send-success', payload: {data: json.result}});
  
        } catch (e){
          // Ошибка при отправке
          dispatch({type: 'comments/send-error'});
        }
      }
    }
  }