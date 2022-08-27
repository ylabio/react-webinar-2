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
          payload: { data: json.result },
        });
      } catch (e) {
        dispatch({ type: "comments/load-error" });
      }
    };
  },
};
