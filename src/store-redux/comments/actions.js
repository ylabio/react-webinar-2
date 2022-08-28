import dateFormat from '../../utils/dateFormatter';
import listToTree from '../../utils/list-to-tree';
import treeToList from '../../utils/tree-to-list';

export default {
  load: _id => {
    return async (dispatch, getState, services) => {
      dispatch({type: 'comments/load', payload: {_id}});
      try {
        const json = await services.api.request({
          url: `/api/v1/comments/?search[parent]=${_id}&fields=items(*,author(profile(name))),count&limit=*`
        });
        dispatch({
          type: 'comments/load-success',
          payload: {
            comments: treeToList(listToTree(json.result.items, '_id', _id), (item, level) => ({
              data: {
                author: item.author.profile.name,
                date: dateFormat(item.dateCreate, 'd mmmm yyyy в H:MM'),
                text: item.text,
                _id: item._id
              },
              level
            })),
            total: json.result.count
          }
        });
        dispatch({
          type: 'comments/set-form',
          payload: {
            form: {_id, _type: 'article'}
          }
        });
      } catch (e) {
        dispatch({type: 'comments/load-error'});
      }
    };
  },

  post: () => {
    return async (dispatch, getState, services) => {
      dispatch({type: 'comments/post'});

      try {
        const json = await services.api.request({
          url: `/api/v1/comments?lang=ru&fields=*,author(profile(name))`,
          method: 'POST',
          body: JSON.stringify({
            text: getState().comments.comment,
            parent: {
              ...getState().comments.form
            }
          })
        });
        const comment = {
          _id: json.result._id,
          text: json.result.text,
          author: json.result.author.profile.name,
          date: dateFormat(json.result.dateCreate, 'd mmmm yyyy в H:MM')
        };

        dispatch({
          type: 'comments/post-success',
          payload: {newItem: comment, parentId: json.result.parent._id}
        });
      } catch (e) {}
    };
  },

  setForm: form => ({
    type: 'comments/set-form',
    payload: {form}
  }),

  edit: updated => ({
    type: 'comments/edit',
    payload: {updated}
  })
};
