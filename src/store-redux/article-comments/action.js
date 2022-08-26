export const COMMENTS_LOAD = "comments/load";
export const COMMENTS_LOAD_SUCCESS = "comments/load-success";
export const COMMENTS_PUSH = "comments/push";
export const COMMENT_ERROR = "comments/load-error"


export const load = (_id) => {
        return async (dispatch, getState, services) => {
            dispatch(
                {
                    type: COMMENTS_LOAD,
                }
            )
            try {
                const json = await services.api.request(
                    {
                        url:
                            `/api/v1/comments?search[parent]=${_id}&fields=items(*,author(profile(name))),count&sort=order&limit=*`
                    });
                dispatch({
                    type: COMMENTS_LOAD_SUCCESS,
                    payload: {
                        items: json.result.items,
                        count: json.result.count
                    }
                });
            } catch (e) {
                dispatch({
                    type: COMMENT_ERROR
                });
            }
        }
    }
  export const post = (text, parent_id, parentType) => {
    return async (dispatch, getState, services) => {
        dispatch({type: COMMENTS_PUSH,
            payload:
                {text, parent_id}
        })
            const response = await services.api.request(
                {
                    url: `/api/v1/comments`, method: "POST",
                    body: JSON.stringify({
                        text: text,
                        parent: {
                            _id: parent_id,
                            _type: parentType
                        }})
                })
              dispatch(load(response.result.parent._tree.find((p) => p._type === "article")._id))
    }
}

