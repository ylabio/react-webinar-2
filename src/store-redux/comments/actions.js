import { getNestedComments } from "./utils";
// вызывается тут, а не в reducer, чтобы не возиться с передачей article id в функцию

const fields = '_id,text,dateCreate,author(_id,profile(name)),parent(_id,_type)';

export default {
  // _id === article id
  load: (_id) => {
    return async (dispatch) => {
      dispatch({ type: 'comments/load', });

      await fetch(`/api/v1/comments?search[parent]=${_id}&fields=${fields}&limit=50`)
        .then(res => {
          if (res.ok) return res.json();
          throw new Error(res.status + ' ' + res.statusText);
        })
        .then(json => {
          dispatch({
            type: 'comments/load-success',
            payload: {
              items: getNestedComments(json.result.items, _id),
              parentId: _id,
            },
          });
        })
        .catch(err => {
          console.error('store-redux/comments/actions.load -', err.message);
          dispatch({ type: 'comments/load-error', });
          // тут наверное надо вывести ошибку на странице
        })
    };
  },

  send: (text, userId, parentId, articleId) => {
    return async (dispatch, getState, services) => {

      const json = await services.api.request({
        url: `/api/v1/comments?fields=${fields}`,
        method: 'POST',
        body: JSON.stringify({
          author: {
            _id: userId,
          },
          text: text !== '' ? text : '--no-text--',
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
      }
      else {
        console.error('store-redux/comments/actions.send');
        console.error(json.error);
      }
    };
  },
};