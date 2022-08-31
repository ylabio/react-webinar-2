import listToTree from '../../utils/list-to-tree';
import actionsArticle from '../article/actions';

export default {
  load: (_id) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'comments/load' });

      try {
        const json = await services.api.request({
          url: `/api/v1/comments/?search[parent]=${_id}&limit=1000000000&fields=*`,
        });
        // Товар загружен успешно
        const rootElement = {};
        rootElement[_id] = { _id, children: [] };

        const jsonUsers = await services.api.request({
          url: `/api/v1/users?limit=10000000000000&skip=0&fields=items(_id,profile)`,
        });

        const users = jsonUsers.result.items;

        console.log(json.result.items);

        const data = listToTree(json.result.items, _id);
        const count = json.result.items.length;
        dispatch({
          type: 'comments/load-success',
          payload: { data, count, users, showForm: _id },
        });
      } catch (e) {
        console.log(e);
        // Ошибка при загрузке
        // dispatch({ type: 'comments/load-error' });
      }
    };
  },

  create: (comment, _id) => {
    return async (dispatch, getState, services) => {
      console.log(comment);
      try {
        const json = await services.api.request({
          url: `/api/v1/comments`,
          method: 'POST',
          body: JSON.stringify(comment),
        });
        if (json.result.text) {
          dispatch(actionsArticle.load(_id));
        }
      } catch (e) {
        // Ошибка при загрузке
        dispatch({ type: 'article/load-error' });
      }
    };
  },
};
