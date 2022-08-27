// Начальное состояние товара
const initialState = {
  data: {},
  comments: [],
  waiting: false,
  waitingComments: false,
  waitingSending: false,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case "article/load":
      return {...state, data: {}, waiting: true};

    case "article/load-success":
      return {...state, data: action.payload.data, waiting: false};

    case "article/load-error":
      return {...state, data: {}, waiting: false}; //@todo текст ошибки сохранить?

    case "article/load-comments":
      return {...state, waitingComments: true};

    case "article/load-comments-success":
      return {...state, comments: action.payload.data, waitingComments: false};

    case "article/load-comments-error":
      return {...state, waitingComments: false};

    case "article/send-comment":
      return {...state, waitingSending: true};

    case "article/send-comment-success":
      return {...state, waitingSending: false};

    case "article/send-comment-error":
      return {...state, waitingSending: false};

    default:
      // Нет изменений
      return state;
  }
}
