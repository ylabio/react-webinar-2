import listToTree from "../../utils/list-to-tree";

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
      }
    };
  },
  create(item) {
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

        dispatch({ type: "comments/create-success" });
      } catch (e) {
        dispatch({ type: "comments/create-error" });
        console.log(e.message);
      }
    };
  },
};
