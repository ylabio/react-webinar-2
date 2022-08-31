// Начальное состояние комментариев
const initialState = {
  data: [],
  newCommentId: null,
  waiting: false,
}

export default function reducer(state = initialState, action){
  switch (action.type) {

    case "comments/load":
      return { ...state, data: [], newCommentId: null, waiting: true};

    case "comments/load-success":
      return { ...state, data: action.payload.data.items, waiting: false};

    case "comments/load-error":
      return { ...state, data: [], waiting: false}; //@todo текст ошибки сохранить?

    case "comments/send":
      return { ...state, waiting: true};

    case "comments/send-success":
      return { ...state, data: [...state.data, action.payload.data], newCommentId: action.payload.data._id, waiting: false};

    case "comments/send-error":
      return { ...state, waiting: false}; //@todo текст ошибки сохранить?

    default:
      // Нет изменений
      return state;
  }
}
