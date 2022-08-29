// Начальное состояние товара
const initialState = {
  data: {},
  waiting: false,
  waitingNew: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/load":
      return { ...state, data: {}, waiting: true };

    case "comments/load-success":
      return { ...state, data: action.payload.data, waiting: false };

    case "comments/load-error":
      return { ...state, data: {}, waiting: false }; //@todo текст ошибки сохранить?

    case "comments/new":
      return { ...state, waitingNew: true };

    case "comments/new-success":
      return {
        ...state,
        data: [...state.items, action.payload.data],
        waitingNew: false,
      };

    case "comments/new-error":
      return { ...state, waitingNew: false };

    default:
      // Нет изменений
      return state;
  }
}
