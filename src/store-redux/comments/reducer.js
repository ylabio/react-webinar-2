// Начальное состояние комментариев
const initialState = {
  items: [],
  count: 0,
  waiting: false
}

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case "comments/load":
      return { ...state, items: [], count: 0, waiting: true };

    case "comments/load-success":
      return { ...state, items: action.payload.data.items, count: action.payload.data.count, waiting: false };

    case "comments/load-error":
      return { ...state, items: [], count: 0, waiting: false };

    case "comments/post":
      return { ...state, waiting: true };

    case "comments/post-success":
      return { ...state, items: [...state.items, action.payload.item], count: state.count + 1, waiting: false };

    case "commets/post-error":
      return { ...state, waiting: false };

    default:
      // Нет изменений
      return state;
  }
}
