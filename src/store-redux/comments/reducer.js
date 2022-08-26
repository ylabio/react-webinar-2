const initialState = {
	data: {},
	waiting: false,
	count: 0,
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case 'comments/load':
			return { ...state, data: {}, waiting: true, count: 0 };

		case 'comments/load-success':
			return {
				...state,
				data: action.payload.data,
				waiting: false,
				count: action.payload.data.items.length,
			};

		case 'comments/load-error':
			return { ...state, data: {}, waiting: false, count: 0 };

		default:
			return state;
	}
}
