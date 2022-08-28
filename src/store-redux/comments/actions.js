export const load = (_id) => {
  return async (dispatch, getState, services) => {
    dispatch({ type: "comments/load" });

    try {
      const json = await services.api.request({
        url: `/api/v1/comments/?search[parent]=${_id}&fields=items(*,author(profile(name))),count&sort=order&limit=*`,
      });
      dispatch({
        type: "comments/load-success",
        payload: { items: json.result.items, count: json.result.count },
      });
    } catch (e) {
      dispatch({ type: "comments/load-error" });
    }
  };
};
export const selectReplyId = (_id) => {
  return (dispatch, getState, services) => {
    dispatch({
      type: "comments/select-reply",
      payload: { _id },
    });
  };
};
export const resetReplyId = () => {
  return (dispatch, getState, services) => {
    dispatch({
      type: "comments/reset-reply",
    });
  };
};
export const post = (pageId, parentId, type, text) => {
  return async (dispatch, getState, services) => {
    if (text.length === 0) return;
    dispatch({ type: "comments/load" });
    try {
      const json = await services.api.request({
        url: `/api/v1/comments`,
        method: "POST",
        body: JSON.stringify({
          text,
          parent: {
            _id: parentId,
            _type: type,
          },
        }),
      });
      // @todo обработать ошибку
      // обновляем комментарии т.к. могли появиться новые
      dispatch(load(pageId));
    } catch (e) {
      dispatch({ type: "comments/load-error" });
    }
  };
};
