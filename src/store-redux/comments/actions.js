import { getCommentsByFiltering } from "../../utils/get-comments-by-filtering";

export default {
  create: ({ text, parent }) => {
    return async(dispatch, getState, services) => {
      dispatch({type: 'comments/create'})

      try {
        const json = await services.api.request({
          url: `/api/v1/comments`,
          method: 'POST',
          body: JSON.stringify({
            text,
            parent,
          })
        });

        console.log({json});
        
        dispatch({type: 'comments/create-success'});

      } catch (e){
        dispatch({type: 'comments/create-error'});
      }
    }
  },

  getAll: (productId) => {
    return async(dispatch, getState, services) => {
      dispatch({type: 'comments/getAll'})

      try {
        const json = await services.api.request({
          url: `/api/v1/comments?fields=*,author(_id,profile(name))&limit=*`,
        });

        const filtred = getCommentsByFiltering(json.result.items, productId);
        
        dispatch({type: 'comments/getAll-success', payload: {data: {items: filtred}}});

      } catch (e){
        dispatch({type: 'comments/getAll-error'});
      }
    }
  },
}
