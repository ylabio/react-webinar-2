import convertToRuDate from "../../utils/convert-to-ru-date";
import listToTree from "../../utils/list-to-tree";
import treeToList from "../../utils/tree-to-list";

const actions = {
load: (_id) => {
  return async (dispatch, getState, services) => {
    dispatch({ type: "comments/load" });
    try {
      const target = _id || getState().article.data._id;
      const json = await services.api.request({
        url: `/api/v1/comments/?search[parent]=${target}&limit=*&fields=_id,_type,text,parent,dateCreate,author(profile(name))`,
      });

      const commentsSrc = json.result.items;
      commentsSrc.sort(
        (a, b) => new Date(a.dateCreate) - new Date(b.dateCreate)
      );
      const tree = listToTree(commentsSrc, undefined, { exclude: target });

      const cb = (comment, lvl) => ({
        _id: comment._id,
        text: comment.text,
        author: comment.author.profile.name,
        date: convertToRuDate(comment.dateCreate),
        lvl,
        _type: comment._type,
      });

      const comments = treeToList(tree, cb);

      dispatch({
        type: "comments/load-success",
        payload: { data: comments },
      });

    } catch (e) {
      console.log(e)
      dispatch({ type: "comments/load-error" });
    }
  };
},

  sendComment: (data) => {
  return async (dispatch, getState, services) => {
    console.log(data)
    const body = JSON.stringify({
      text: data.message,
      parent: { _id: data._id, _type: data._type },
    });
    dispatch({ type: "comments/send" });
    try {
      const json = await services.api.request({
        url: `/api/v1/comments/?fields=_id,_type,text,parent,dateCreate,author(profile(name))`,
        method: "POST",
        body,
      });
      const comments = getState().comments.data;
      const comment = {
        _id: json.result._id,
        text: json.result.text,
        author: json.result.author.profile.name,
        date: convertToRuDate(json.result.dateCreate),
        lvl: data._type === 'comment' ? data.lvl + 1 : 0,
        _type: json.result._type,
      };

      let nextIdx = data.idxAfter;
      let isSameNesting = true;
      do {
        if (!comments[nextIdx]) {
          isSameNesting = false;
          break;
        }
        if (data.lvl + 1 > comments[nextIdx].lvl) {
          isSameNesting = false;
          break;
        }
        nextIdx += 1;
      } while (isSameNesting)

      comments.splice(nextIdx || comments.length, 0, comment);

      dispatch({ type: "comments/send-success", payload: {data: comments} });
    } catch (e) {
      dispatch({ type: "comments/send-error" });
    }
  };
},
  reset: () => ({ type: "comments/reset" })
}

export default actions;
