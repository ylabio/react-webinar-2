export default {
  loadComments: (_id) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: "comments/load" });

      try {
        const comments = await services.api.request({
          url: `/api/v1/comments?search[parent]=${_id}&fields=items(*,author(profile(name))),count&sort=order&limit=*`,
        });
        // Комменты загружены успешно
        let stateComments = comments.result.items.map((item) => {
          item.showCommentForm = false;
          return item;
        });
        dispatch({
          type: "comments/load-success",
          payload: { comments: stateComments, count: comments.result.count },
        });
      } catch (e) {
        // Ошибка при загрузке
        dispatch({ type: "comments/load-error" });
      }
    };
  },
  sendNewComment(text, parent) {
    return async (dispatch, getState, services) => {
      console.log(
        JSON.stringify({
          text: text,
          parent: { _id: parent._id, type: parent._type },
        })
      );
      await services.api.request({
        url: `/api/v1/comments`,
        method: "POST",
        body: JSON.stringify({
          text: text,
          parent: { _id: parent._id, _type: parent._type },
        }),
      });
      dispatch(this.loadComments(getState().article.data.article._id));
    };
  },
};
