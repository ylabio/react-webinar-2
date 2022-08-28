// Начальное состояние блока с комментариями
const initialState = {
  items: [],
  count: null,
  error: "",
  waiting: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/load":
      return { ...state, error: "", waiting: true };

    case "comments/load-success":
      return {
        ...state,
        items: action.payload.items,
        count: action.payload.count,
        waiting: false,
      };

    case "comments/load-error":
      return { ...state, error: action.payload.error, waiting: false }; //@todo текст ошибки сохранить?

    case "comments/post":
      return { ...state, waiting: true, error: "" };

    case "comments/post-success":
      return {
        ...state,
        waiting: false,
        items: [...state.items, action.payload],
        count: state.count + 1,
      };

    case "comments/post-error":
      return { ...state, waiting: false, error: action.payload.error };

    case "comments/post-replying":
      return {
        ...state,
        items: state.items.map((item) => {
          item.isReplying = action.payload.id === item._id;
          return item;
        }),
      };

    case "comments/stop-replying":
      return {
        ...state,
        items: state.items.map((item) => {
          item.isReplying = false;
          return item;
        }),
      };
    default:
      // Нет изменений
      return state;
  }
}
