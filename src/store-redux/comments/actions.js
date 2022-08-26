import listToTreeComments from "utils/list-to-tree-comments";
import treeToList from "utils/tree-to-list";

export default {
  setEditor: (_id) => {
    return (dispatch) => {

      dispatch({type: 'comments/set-text-editor', payload: {data: _id}});
    }
  },

  loadComments: (_id) => {
    return async (dispatch, getState, services) => {
      dispatch({type: 'comments/load',})

      try {
        const json = await services.api.request({url: `/api/v1/comments?search[parent]=${_id}&fields=_id,text,dateCreate,parent(_type,_id),author(profile(name))&limit=*`});

        const comments = [...treeToList(
          listToTreeComments(json.result.items, _id),
          (item, level) => ({
            id: item._id,
            author: item.author.profile.name,
            level,
            text: item.text,
            dateCreate: item.dateCreate,
            textEditor:false,
          })
        )]

        // Товар загружен успешно
        dispatch({type: 'comments/load-success', payload: {data: comments}});

      } catch (e) {
        // Ошибка при загрузке
        dispatch({type: 'comments/load-error'});
      }
    }
  },
}
