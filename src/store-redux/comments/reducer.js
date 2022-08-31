// Начальное состояние товара
const initialState = {
  data: [],
  waiting: false,
  count: 0,
  users: [],
  showForm: '',
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'comments/load':
      return { ...state, data: [], waiting: true };

    case 'comments/load-success':
      return { ...state, ...action.payload, waiting: false };

    case 'comments/load-error':
      return { ...state, data: [], waiting: false }; //@todo текст ошибки сохранить?

    case 'comments/set-show-form':
      return { ...state, ...action.payload };
    default:
      // Нет изменений
      return state;
  }
}
