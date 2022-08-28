export default {

  load: function (_id) {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'comments/wait', })
      try {
        const json = await services.api.request(
          {
            url:
              `/api/v1/comments?search[parent]=${_id}&fields=items(*,author(profile(name))),count&sort=order&limit=*`
          });

        dispatch({ type: 'comments/load-success', payload: { items: json.result.items, count: json.result.count } });
      } catch (e) {
        dispatch({ type: 'comments/load-error' });
      }
    }
  },
  openArea: (_id) => {
    return (dispatch, getState, services) => {
      dispatch({ type: "comment/open-area", payload: { commentAreaActive: _id } })
    }
  },
  post: function (text, parent_id, parentType) {
    return async (dispatch, getState, services) => {
      dispatch({ type: "comments/push", payload: { text: text, parent_id: parent_id } })
      try {
        const response = await services.api.request(
          {
            url: `/api/v1/comments`, method: "POST",
            body: JSON.stringify({ text: text, parent: { _id: parent_id, _type: parentType } })
          })
        console.log()
        dispatch(this.load(response.result.parent._tree.find((p) => p._type === "article")._id))
      } catch (e) {
        console.log(e)
      }
    }
  }
}