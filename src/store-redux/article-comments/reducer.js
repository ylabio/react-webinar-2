// Начальное состояние товара
const initialState = {
  comments: [],
  count: 0,
  waiting: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/load":
      return { ...state, waiting: true };

    case "comments/load-success":
      return { ...state, ...action.payload, waiting: false };

    case "comments/load-error":
      return { ...state, waiting: false }; //@todo текст ошибки сохранить?

    default:
      // Нет изменений
      return state;
  }
}
