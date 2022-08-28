const initialState = {
	items: [],
	waiting: false,
	itemsCount: 0,
	activeKey: 'main'
};

export default function(state = initialState, action) {
	switch(action.type) {
		case "comments/load": 
			return {...state, items: [], waiting: true, itemsCount: 0};

		case "comments/load-success":
      return {...state, items: action.payload, waiting: false, itemsCount: action.payload.length};

    case "comments/load-error":
      return {...state, items: [], waiting: false};

		case "comments/post-new-comment":
			return {...state};

		case "comments/add-new-comment":
		let items = [];
		
		if(action.payload.itemIndex) {
			let newArr = [...state.items.slice(action.payload.itemIndex + 1, state.items.length + 1)];
			
			let k = newArr.reduce((acc, currValue) => {
				if(currValue.lvl === action.payload.lvl) {
					acc = acc + 1;
				}
				return acc;
			}, 0);

			items = [...state.items.slice(0, action.payload.itemIndex + k + 1), action.payload, ...state.items.slice(action.payload.itemIndex + k + 1)]; 
			console.log(items);
			
		} else {
			items = [...state.items, action.payload];
			console.log(items);
		}
		
		return {...state, items: items, itemsCount: state.itemsCount + 1};

		case "comments/set-active-form":
			return {...state, activeKey: action.payload};

		default:
			return state;
	}
}