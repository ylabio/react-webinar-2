export default {

    load: (_id) => {
        return async (dispatch, getState, services) => {
            dispatch({type: 'comments/load',})

            try {
                const json = await services.api.request({url: `/api/v1/comments?search[parent]=${_id}&fields=_id,text,dateCreate,parent,author(profile(name))&limit=*`});

                dispatch({type: 'comments/load-success', payload: {data: json.result.items}});

            } catch (e) {

                dispatch({type: 'comments/load-error', payload: {message: 'Что-то пошло не так...'}});
            }
        }
    },
    createComment: (data) => {
        return async (dispatch, getState, services) => {
            dispatch({type: 'comments/create-start'})
            try{
                const json = await services.api.request({
                    url: `/api/v1/comments`,
                    method: 'POST',
                    body: JSON.stringify(data)
                })
                dispatch({type: 'comments/create-success', payload: {data: json.result}});
            }catch (e) {
                dispatch({type: 'comments/create-error', payload: {message: 'Комментарий не создан...'}});
            }
        }

    }
}
