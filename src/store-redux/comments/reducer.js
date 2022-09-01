// Начальное состояние товара
const initialState = {
  data: {},
  newComment: {
    parent: "",
    waiting: false
  },
  data: {},
  waiting: false,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case "comments/load":
      return { ...state, data: {}, waiting: true };

    case "comments/load-success":
      return { ...state, data: action.payload.data, waiting: false };

    case "comments/load-error":
      return { ...state, data: {}, waiting: false }; //@todo текст ошибки сохранить?

    case "comments/add-coment/load":
      return { ...state, newComment: { ...state.newComment, waiting: true } };

    case "comments/add-coment/load-success":
      return {
        ...state,
        data: {
          ...state.data,
          items: [...state.data.items, {...action.payload.data, new: true}]
        },
        newComment: { ...state.newComment, waiting: false }
      };

    case "comments/add-coment/load-error":
      return { ...state, newComment: { ...state.newComment, waiting: false } };

    case "comments/newComment/change-parent":
      return { ...state, newComment: { ...state.newComment, parent: action.payload.data } }

    default:
      // Нет изменений
      return state;
  }
}
