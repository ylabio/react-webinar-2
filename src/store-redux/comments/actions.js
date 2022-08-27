import { commentsToTree } from "../../utils/comments-to-tree";
import { treeToComments } from "../../utils/tree-to-comments";

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
          url: `/api/v1/comments?fields=*,author(_id,profile(name))&limit=*&search[parent]=${productId}`,
        });

        const tree = commentsToTree(json.result.items);
        const comments = treeToComments(tree);
        const length = json.result.items.length;

        dispatch({type: 'comments/getAll-success', payload: {data: {items: comments}, total: length}});

      } catch (e){
        dispatch({type: 'comments/getAll-error'});
      }
    }
  },
}
