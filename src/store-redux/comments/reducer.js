// Начальное состояние
const initialState = {
  data: [],
  count: 0,
  waiting: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/load":
      return { ...state, data: [], count: 0, waiting: true };

    case "comments/load-success":
      return { ...state, data: action.payload.data, waiting: false };

    case "comments/load-error":
      return { ...state, data: [], count: 0, waiting: false }; //@todo текст ошибки сохранить?

    case "comments/post":
      return { ...state, waiting: true };

    case "comments/post-success":
      return {
        ...state,
        data: [...state.data, action.payload.data],
        waiting: false,
        count: state.count + 1,
      };

    case "comments/post-error":
      return { ...state, waiting: false };

    default:
      // Нет изменений
      return state;
  }
}
