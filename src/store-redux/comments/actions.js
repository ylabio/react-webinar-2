export default {
	load: (_id) => {
		return async (dispatch, getState, services) => {
			dispatch({ type: 'comments/load' });

			try {
				const json = await services.api.request({
					url: `/api/v1/comments?search[parent]=${_id}&fields=_id,text,dateCreate,author(profile(name)),parent(_id, _type, _tree)&limit=*`,
				});
				dispatch({
					type: 'comments/load-success',
					payload: { data: json.result },
				});
			} catch (e) {
				dispatch({ type: 'comments/load-error' });
			}
		};
	},
};
