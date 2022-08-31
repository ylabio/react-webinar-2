export default {
    loadComments: (_id) => {
        return async(dispatch, getState, services) => {
            dispatch({type: 'article/comments',})

            try {
                const json = await services.api.request({url: `/api/v1/comments/?search[parent]=${_id}&fields=_id,text,dateCreate,author(profile(name)),parent(_id)&limit=*`});

                dispatch({type: 'article/comments-success', payload: {comments: json.result.items}});

            } catch (e){
                dispatch({type: 'article/comments-error'});
            }
        }
    },

    postComments: ({id, text, parent}) => {
        return async(dispatch, getState, services) => {
            const userToken = localStorage.getItem('token');
            const json = await services.api.request({
                url: `/api/v1/comments?fields=_id,text,dateCreate,author(profile(name)),parent(_id)`,
                method: 'POST',
                headers: {
                    'X-Token': userToken,
                },
                body: JSON.stringify({id, text, parent})
            });

            dispatch({type: 'article/comments-add-success', payload: json.result});
        }
    }
}