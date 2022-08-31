const actions = {
  load: (_id) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: "article/load" });
      try {
        const json = await services.api.request({
          url: `/api/v1/articles/${_id}?fields=*,maidIn(title,code),category(title)`,
        });
        // Товар загружен успешно
        dispatch({
          type: "article/load-success",
          payload: { data: json.result },
        });
      } catch (e) {
        // Ошибка при загрузке
        dispatch({ type: "article/load-error" });
      }
    };
  },

  // loadComments: (_id) => {
  //   return async (dispatch, getState, services) => {
  //     dispatch({ type: "article/load-comments" });
  //     try {
  //       const target = _id || getState().article.data._id;
  //       const json = await services.api.request({
  //         url: `/api/v1/comments/?search[parent]=${target}&limit=*&fields=_id,_type,text,parent,dateCreate,author(profile(name))`,
  //       });
  //
  //       const commentsSrc = json.result.items;
  //       commentsSrc.sort(
  //         (a, b) => new Date(a.dateCreate) - new Date(b.dateCreate)
  //       );
  //       const tree = listToTree(commentsSrc, undefined, { exclude: target });
  //
  //       const cb = (comment, lvl) => ({
  //         _id: comment._id,
  //         text: comment.text,
  //         author: comment.author.profile.name,
  //         date: convertToRuDate(comment.dateCreate),
  //         lvl,
  //         _type: comment._type,
  //       });
  //
  //       const comments = treeToList(tree, cb);
  //
  //       dispatch({
  //         type: "article/load-comments-success",
  //         payload: { data: comments },
  //       });
  //
  //     } catch (e) {
  //       console.log(e)
  //       dispatch({ type: "article/load-comments-error" });
  //     }
  //   };
  // },
  //
  // sendComment: (data) => {
  //   return async (dispatch, getState, services) => {
  //     const body = JSON.stringify({
  //       text: data.message,
  //       parent: { _id: data._id, _type: data._type },
  //     });
  //     dispatch({ type: "article/send-comment" });
  //     try {
  //       await services.api.request({
  //         url: `/api/v1/comments/`,
  //         method: "POST",
  //         body,
  //       });
  //
  //       dispatch({ type: "article/send-comment-success" });
  //
  //       dispatch(actions.loadComments());
  //     } catch (e) {
  //       dispatch({ type: "article/send-comment-error" });
  //     }
  //   };
  // },
};

export default actions;
