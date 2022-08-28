export default {

    post: (text, id, type) => {
      return async(dispatch, getState, services) => {
        // dispatch({type: 'comment/post',})
  
        try {
            const json = await services.api.request(
              {url: `/api/v1/comments`, method: 'POST', body: JSON.stringify({
                "text": text,
                "parent": {"_id": id, "_type": type}
              })}
            );
            dispatch({type: 'comment/post-success', payload: {data: json.result}});
    
          } catch (e){
            
            dispatch({type: 'comment/post-error', payload: {message: e}});
          }
      }
    },
  }