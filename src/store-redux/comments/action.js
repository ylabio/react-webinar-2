export default {

    loadComments: (_id) => {
      return async(dispatch, getState, services) => {
        dispatch({type: 'comments/load',})
        
        try {
          const json = await services.api.request({url: `api/v1/comments?search[parent]=${_id}&limit=*&fields=items(*,author(profile(name))),count`});
          // Товар загружен успешно
       
          dispatch({type: 'comments/load-success', payload: {data: json.result}});
        } catch (e){
          // Ошибка при загрузке
          dispatch({type: 'comments/load-error'});
        }
      }
    },
   submitComment:(data,arcticle_id)=>{
      return async(dispatch,getState,services)=>{
        dispatch({type: 'comments/start',});
        try {
          const json = await services.api.request({
            url: `/api/v1/comments?fields=_id,author(profile(name))&lang=ru`,
            method: 'POST',
            body: JSON.stringify(data),
          });
          
       
        }catch(error){
          dispatch({type:"comments/error"})
        }
      }
    }
  }
  