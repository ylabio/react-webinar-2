import listToTree from "../../utils/list-to-tree";
import treeToList from "../../utils/tree-to-list";

export default {
  load: (_id) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: "comments/load" });

      try {
        const json = await services.api.request({
          url: `/api/v1/comments?search[parent]=${_id}&limit=*&fields=items(*,author(profile(name))),count`,
        });

        dispatch({
          type: "comments/load-success",
          payload: {
            data: listToTree(json.result.items, "_id", _id),
            count: json.result.count,
          },
        });
      } catch (e) {
        dispatch({ type: "comments/load-error" });
        console.log(e.message);
      }
    };
  },
  create(item, _id, current_user, callback = () => {}) {
    return async (dispatch, getState, services) => {
      dispatch({ type: "comments/create" });

      try {
        const json = await services.api.request({
          url: `/api/v1/comments`,
          method: "post",
          body: JSON.stringify({
            text: item.text,
            parent: item.parent,
          }),
        });
        let new_comment = json.result;
        new_comment.author = { profile: { name: current_user } };
        const old_list = treeToList(getState().comments.data);
        const new_list = listToTree(old_list.concat(new_comment), "_id", _id);

        callback();
        dispatch({
          type: "comments/create-success",
          payload: { data: new_list },
        });
      } catch (e) {
        dispatch({ type: "comments/create-error" });
        console.log(e.message);
      }
    };
  },
};
