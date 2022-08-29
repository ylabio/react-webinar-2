// Начальное состояние товара
const initialState = {
  data: [],
  waiting: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'comments/load':
      return { ...state, data: [], waiting: true };

    case 'comments/show':
      return { ...state, data: action.payload };

    case 'comments/hide':
      return { ...state, data: action.payload };

    case 'comments/add':
      return { ...state, data: [...state.data, action.payload.data] };

    case 'comments/load-success':
      return { ...state, data: action.payload.data, waiting: false };

    case 'comments/load-error':
      return { ...state, data: [], waiting: false };

    default:
      // Нет изменений
      return state;
  }
}
