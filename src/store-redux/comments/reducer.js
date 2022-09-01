const initialState = {
  items: [],
  waiting: false,
  count: 0,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case "comments/load":
      return {...state, items: [], waiting: true};

    case "comments/load-success":
      return {...state, items: action.payload.items, waiting: false, count: action.payload.count};

    case "comments/load-error":
      return {...state, items: [], waiting: false};

    case "comments/add-comment":
      return {...state, waiting: true};

    case "comments/add-comment-success":
      return {...state, items: [...state.items, action.payload.item], waiting: false};

    case "comments/add-comment-error":
      return {...state, waiting: false};

    default:
      return state;
  }
}