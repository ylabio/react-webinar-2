import { cleanFromSpoiledData } from "../../utils/clean-from-spoiled-data";
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

        const id = json.result._id;
        dispatch({type: 'comments/setLastCreatedId', payload: id});
        
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

        const cleaned = cleanFromSpoiledData(json.result.items);
        const comments = createCommentList(cleaned);
        const length = cleaned.length;

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
  },
  
  setBranches(branchData) {
    return {
      type: 'comments/setBranches',
      payload: branchData,
    };
  },

  setLastCreatedId(id) {
    return {
      type: 'comments/setLastCreatedId',
      payload: id,
    };
  },

  addCommentPosition(id, fromTop) {
    return {
      type: 'comments/addCommentPosition',
      payload: {id, fromTop},
    };
  },
}
