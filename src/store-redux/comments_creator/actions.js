export default {

  createComments: ({_id, _type}, token) => {
    return async(dispatch, getState, services) => {
      dispatch({type: 'comment/post', payload: {_id, _type}})

      try {
        await fetch(`/api/v1/comments/`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Token': token
          },
          body: JSON.stringify(getState().comments_creator)
        })
        .then(() => {
          dispatch({type: 'comment/reset'})
        })
        
      } catch (e){
      }
    }
  },
}
