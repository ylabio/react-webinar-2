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
			
			let k = 0;
			
			const ev = newArr.every((item, index) => {
				if(newArr[index].lvl >= action.payload.lvl) {
					k = k + 1;
					return true;
				} else {
					return false;
				}
			});

			items = [...state.items.slice(0, action.payload.itemIndex + k + 1), action.payload, ...state.items.slice(action.payload.itemIndex + k + 1)];
		} else {
			items = [...state.items, action.payload];
		}
		
		return {...state, items: items, itemsCount: state.itemsCount + 1};

		case "comments/set-active-form":
			return {...state, activeKey: action.payload};

		default:
			return state;
	}
}