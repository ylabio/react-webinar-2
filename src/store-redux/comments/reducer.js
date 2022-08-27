const initialState = {
	data: [],
	waiting: false,
	count: 0,
	formId: '',
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case 'comments/load':
			return { ...state, data: [], waiting: true, count: 0 };

		case 'comments/load-success':
			return { ...state, data: action.payload.data, waiting: false, count: 0 };

		case 'comments/load-error':
			return { ...state, data: [], waiting: false, count: 0 };

		case 'comments/open-form':
			return { ...state, formId: action.payload };

		default:
			return state;
	}
}
