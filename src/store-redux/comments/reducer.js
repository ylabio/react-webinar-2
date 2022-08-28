const initialState = {
  items: [],
  count: 0,
  waiting: false,
  replyStatus: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'comments/load':
      return { ...state, items: [], count: 0, waiting: true };

    case 'comments/load-success':
      return {
        ...state,
        items: action.payload.data.items,
        count: action.payload.data.count,
        waiting: false,
      };

    case 'comments/load-error':
      return { ...state, items: [], count: 0, waiting: false };

    case 'comments/post-success':
      return {
        ...state,
        items: [...state.items, action.payload.data],
        count: state.count + 1,
        replyStatus: null,
        waiting: false,
      };

    case 'comments/show-reply':
      return { ...state, replyStatus: action.payload.data, waiting: false };

    default:
      // Нет изменений
      return state;
  }
}
