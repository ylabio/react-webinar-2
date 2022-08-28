export default {
	load: (articleId) => {
		return async (dispatch, getState, services) => {
			dispatch({ type: 'comments/load' });

			try {
				const json = await services.api.request({
					url: `/api/v1/comments?search[parent]=${articleId}&fields=items(*,author(profile(name))),count&limit=*`,
				});

				dispatch({
					type: 'comments/load-success',
					payload: { data: json.result, count: json.result.count },
				});
			} catch (e) {
				dispatch({ type: 'comments/load-error' });
			}
		};
	},

	openForm: (formId) => {
		return (dispatch) => {
			dispatch({ type: 'comments/open-form', payload: formId });
		};
	},

	createComment: (text, parentId, parentType, articleId) => {
		return async (dispatch, getState, services) => {
			try {
				await services.api.request({
					method: 'POST',
					url: `/api/v1/comments`,
					body: JSON.stringify({
						parent: { _id: parentId, _type: parentType },
						text: text,
					}),
				});

				const json = await services.api.request({
					url: `/api/v1/comments?search[parent]=${articleId}&fields=items(*,author(profile(name))),count&limit=*`,
				});

				dispatch({
					type: 'comments/load-success',
					payload: { data: json.result },
				});
				dispatch({ type: 'comments/open-form', payload: articleId });
			} catch (e) {
				console.log(e);
			}
		};
	},
};
