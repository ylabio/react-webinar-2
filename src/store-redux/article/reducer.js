// Начальное состояние товара
const initialState = {
  data: {},
  waiting: false,
  error: ''
};

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case 'article/load':
      return { ...state, data: {}, waiting: true, error: '' };

    case 'article/load-success':
      return { ...state, data: action.payload.data, waiting: false };

    case 'article/load-error':
      return { ...state, waiting: false, error: action.payload.error };

    default:
      // Нет изменений
      return state;
  }
}
