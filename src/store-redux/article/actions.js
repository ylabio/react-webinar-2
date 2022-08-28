import treeToList from "../../utils/tree-to-list";
import listToTree from "../../utils/list-to-tree";
import generateIDs from "../../utils/genIDs";

export default {

  load: (_id) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'article/load', })

      try {
        const [json, jsonCom] = await Promise.all([services.api.request({ url: `/api/v1/articles/${_id}?fields=*,maidIn(title,code),category(title)` }),
        services.api.request({ url: `/api/v1/comments?search[parent]=${_id}&limit=*` })]);
        const items = jsonCom.result.items;
        const article = json.result;
        let comments;
        if (items) {
          comments = treeToList(listToTree([article, ...items]),
            (item, level) => ({ ...item, dateCreate: item.dateCreate, text: item.text, author: item.author, nesting: '+'.repeat(level) }));
          comments.shift();
          if (comments.length) {
            const { result } = await services.api.request({ url: `api/v1/users?search[query]=${[...new Set(comments.map(user => user.author._id))].join('|')}` });
            const { items } = result;
            comments.forEach(comment => {
              comment.author = items.find(user => user._id === comment.author._id).profile.name;
            })
          }
        }
        // Товар загружен успешно
        dispatch({ type: 'article/load-success', payload: { data: json.result }, comLoad: { data: comments } });

      } catch (e) {
        // Ошибка при загрузке
        dispatch({ type: 'article/load-error' });
      }
    }
  },

  sendComment: (text, parent) => {
    return async (dispatch, getState, services) => {
      if (!text) return;
      dispatch({ type: 'article/send' })
      const _id = generateIDs();
      try {
        const message = await services.api.request({ url: `/api/v1/comments`, method: "POST", body: JSON.stringify({ _id, text, parent }) });

        dispatch({ type: 'article/send-success', lastCommented: message.result.dateCreate })
      }
      catch (e) {

        dispatch({ type: 'article/send-error' })
      }
    }
  }
}
