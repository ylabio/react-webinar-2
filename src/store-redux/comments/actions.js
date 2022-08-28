export default {
	load: (_id) => {
		return async (dispatch, getState, services) => {
			dispatch({type: 'comments/load'});
			try {
				const json = await services.api.request({
					url: `/api/v1/comments?search[parent]=${_id}&fields=_id,text,dateCreate,parent,author(profile(name))&limit=*`,
				});
				dispatch({
					type: 'comments/load-success',
					payload: {
						data: json.result.items
					},
				});
			} catch (e) {
				dispatch({type: 'comments/load-error'});
			}
		};
	},

	post: (data, _id) => {
		return async (dispatch, getState, services) => {
			try {
				await services.api.request({
					method: 'POST',
					url: '/api/v1/comments',
					body: JSON.stringify(data),
				});
				const json = await services.api.request({
					url: `/api/v1/comments?search[parent]=${_id}&fields=_id,text,dateCreate,parent,author(profile(name))&limit=*`,
				});
				dispatch({
					type: 'comments/load-success',
					payload: {
						data: json.result.items
					},
				});
			} catch (e) {
				dispatch({type: 'comments/load-error'});
			}
		};
	}
};