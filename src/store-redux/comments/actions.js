import {getNestedComments} from "../../utils/comments/getNestedComments";

export default {
  load: (_id) => {
    return async (dispatch, getState, services) => {
      dispatch({type: 'comments/load',});
      try {
        const json = await services.api.request(
          {
            url:
              `/api/v1/comments?search[parent]=${_id}&fields=items(*,author(profile(name))),count&sort=order&limit=*`
          });
        dispatch({
          type: 'comments/load-success',
          payload: {
            items: getNestedComments(json.result.items, _id),
            parentId: _id,
          },
        });
      } catch (error) {
        dispatch({type: 'comments/load-error', error});
      }
    }
  },

  send: (text, userId, parentId, articleId) => {
    return async (dispatch, getState, services) => {

      const json = await services.api.request({
        url: `/api/v1/comments?fields=_id,text,dateCreate,author(_id,profile(name)),parent(_id,_type)`,
        method: 'POST',
        body: JSON.stringify({
          text: text,
          parent: {
            _id: parentId,
            _type: parentId === articleId ? 'article' : 'comment',
          },
        })
      })

      if (json.result) {
        dispatch({
          type: 'comments/comment-added',
          payload: getNestedComments(getState().comments.items.concat(json.result), articleId),
        })
      } else {
        console.error('store-redux/comments/actions.send');
        console.error(json.error);
      }
    };
  },
};