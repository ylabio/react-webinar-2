import { createCommentList } from "../../utils/create-comment-list";
import actions from './actions';

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

        console.log({json})
        
        dispatch({type: 'comments/create-success'});

        const productId = getState().comments.productId;
        dispatch(actions.getAll(productId));

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
          url: `/api/v1/comments?fields=*,author(_id,profile(name))&limit=*&search[parent]=${productId}`,
        });

        console.log({getall: json.result.items})

        const comments = createCommentList(json.result.items);
        const length = json.result.items.length;

        console.log('LEN: ', comments.flat().length)
        
        dispatch({type: 'comments/getAll-success', payload: {data: {items: comments}, total: length}});

      } catch (e){
        dispatch({type: 'comments/getAll-error'});
      }
    }
  },

  setProductId(productId) {
    return {
      type: 'comments/setProductId',
      payload: productId,
    };
  } 
}
