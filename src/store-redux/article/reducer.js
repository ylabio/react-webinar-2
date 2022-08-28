// Начальное состояние товара
const initialState = {
  data: {},
  waiting: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "article/load":
    case "article/load-success":
    case "article/load-error":
      return { ...state, ...action.payload };

    default:
      // Нет изменений
      return state;
  }
}
