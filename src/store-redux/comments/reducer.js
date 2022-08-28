// Начальное состояние товара
const initialState = {
  waiting: false,
  data: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/waiting":
    case "comments/loadComments":
    case "comments/loadComments-success":
    case "comments/loadComments-error":
      return { ...state, ...action.payload };

    default:
      // Нет изменений
      return state;
  }
}
