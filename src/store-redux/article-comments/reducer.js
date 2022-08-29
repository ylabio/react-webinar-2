const initialState = {
  data: [],
  waiting: false,
  error: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case 'comments/load':
      return { ...state, data: [], waiting: true, error: null };

    case 'comments/load-success':
      return { ...state, data: action.payload.data.items, waiting: false };

    case 'comments/load-error':
      return { ...state, waiting: false, error: action.payload.error };

    case 'comments/send':
      return { ...state, waiting: true, error: null };

    case 'comments/send-success':
      return { ...state, data: [...state.data, action.payload.data], waiting: false };

    case 'comments/send-error':
      return { ...state, waiting: false, error: action.payload.error };

    default:
      // Нет изменений
      return state;
  }
}