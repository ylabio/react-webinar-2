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
      } catch (e) {
        dispatch({type: 'comments/load-error'});
      }
    };
  },

  post: (_parentId, _parentType, text) => {
    return async (dispatch, services) => {
      dispatch({type: 'comments/post'});

      try {
        const json = await services.api.request({
          url: `/api/v1/comments?lang=ru&fields=*`,
          method: 'POST',
          body: JSON.stringify({
            text,
            parent: {
              _id: _parentId,
              _type: _parentType
            }
          })
        });
      } catch (e) {}
    };
  },

  setFormPlacement: formPlacement => ({
    type: 'comments/set-form-placement',
    payload: {formPlacement}
  })
};
