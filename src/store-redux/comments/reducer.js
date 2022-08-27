// Начальное состояние комментариев
const initialState = {
  data: [],
  count: 0,
  waiting: false,
  error: ''
};

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case 'comments/load':
      return { ...state, data: [], count: 0, waiting: true, error: '' };

    case 'comments/load-success':
      return { ...state, data: action.payload.data.items, count: action.payload.data.count, waiting: false };

    case 'comments/load-error':
      return { ...state, waiting: false, error: action.payload.error };

    case 'comments/upload':
      return { ...state, waiting: true, error: '' };

    case 'comments/upload-success':
      return { ...state, data: [...state.data, action.payload.data], count: ++state.count, waiting: false };

    case 'comments/upload-error':
      return { ...state, waiting: false, error: action.payload.error };

    default:
      // Нет изменений
      return state;
  }
}
