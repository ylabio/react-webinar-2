const initialState = {
	items: [],
	waiting: false,
	itemsCount: 0
};

export default function(state = initialState, action) {
	switch(action.type) {
		case "comments/load": 
			return {...state, items: [], waiting: true, itemsCount: 0};

		case "comments/load-success":
      return {...state, items: action.payload, waiting: false, itemsCount: action.payload.length};

    case "comments/load-error":
      return { ...state, items: [], waiting: false};

		default:
			return state;
	}
}