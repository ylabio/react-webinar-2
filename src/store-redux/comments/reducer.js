const initialState = {
  items: [],
  count: 0,
  waiting: false,
  replyId: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/load":
      return { ...state, waiting: true };

    case "comments/load-success":
      return {
        ...state,
        items: action.payload.items,
        count: action.payload.count,
        replyId: null,
        waiting: false,
      };

    case "comments/load-error":
      return { ...state, waiting: false }; //@todo текст ошибки сохранить?

    case "comments/select-reply":
      return { ...state, replyId: action.payload._id };

    case "comments/reset-reply":
      return { ...state, replyId: null };

    default:
      // Нет изменений
      return state;
  }
}
