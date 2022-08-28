const initialState = {
  data: [],
  count: 0,
  waiting: false,
}

export default function reducer(state = initialState, action){
  switch (action.type) {
    case "comments/load":
      return { ...state, data: [], count: 0, waiting: true};

    case "comments/load-success":
      return { ...state, data: action.payload.data.items, count: action.payload.data.count, waiting: false};

    case "comments/load-error":
      return { ...state, data: [], count: 0, waiting: false};

    case "comments/post":
      return { ...state, waiting: true};

    case "comments/post-success":
      return { ...state, data: state.data.concat(action.payload.data), count: state.count + 1, waiting: false};

    case "comments/post-error":
      return { ...state, data: [], count: 0, waiting: false};

    default:
      // Нет изменений
      return state;
  }
}
