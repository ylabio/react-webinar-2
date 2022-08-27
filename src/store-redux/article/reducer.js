// Начальное состояние товара
const initialState = {
  data: {},
  waiting: false,
  comments: [],
}

export default function reducer(state = initialState, action){
  switch (action.type) {

    case "article/load":
      return { ...state, data: {}, waiting: true};

    case "article/load-success":
      return { ...state, data: action.payload.data, waiting: false};

    case "article/load-error":
      return { ...state, data: {}, waiting: false}; //@todo текст ошибки сохранить?

    case "article/comments": {
      return { ...state, comments: [], waiting: false};
    }

    case "article/comments-success":
      return { ...state, comments: action.payload, waiting: false};

    case "article/comments-error":
      return { ...state, comments: [], waiting: false};

    default:
      // Нет изменений
      return state;
  }
}
