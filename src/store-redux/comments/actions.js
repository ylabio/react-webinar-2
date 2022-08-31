export default {
  setActiveItem: (id) => {
    return (dispatch) => {
      dispatch({type: "comments/set-active-item", payload: id})
    }
  },

  setActiveField: filed => {
    return (dispatch) => {
      dispatch({type: "comments/set-active-field", payload: filed})
    }
  },
  
  load: (_id) => {
    return async(dispatch, getState, services) => {
      
      try {
        const json = await services.api.request(
          {url: `/api/v1/comments/?search[parent]=${_id}&fields=_id,text,dateCreate,author(profile(name)),parent(_id)&limit=*`}
          );
          dispatch({type: 'comments/load-success', payload: {data: json.result}});
        } catch (e){
          dispatch({type: 'commets/load-error'});
        }
      }
    },
  }

