export default {

  increaseСount: (data) => {
    return async(dispatch, getState, services) => {
      try {
        const json = await services.api.request({
          method: 'POST',
          url: '/api/v1/comments',
          body: JSON.stringify(data)
        });
        
        if (!json.error) 
          dispatch({type: 'comment/increaseСount', payload: {countAddComment: 1}});

      } catch (e){
        dispatch({type: 'comment/increaseСount-error'});
      }
    } 
  },
}
