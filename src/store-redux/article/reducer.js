// Начальное состояние товара
const initialState = {
  data: {},
  comments: [],
  count: 0,
  waiting: false
}

export default function reducer(state = initialState, action){
  switch (action.type) {

    case "article/load":
      return { ...state, data: {}, waiting: true};

    case "article/load-success":
      return { ...state, data: action.payload.data, waiting: false};

    case "comments/load-success":
      return { ...state, comments: action.payload.comments, waiting: false};
    
    case "commentsCount/load-success":
      return { ...state, count: action.payload.commentsCount, waiting: false};

    case "article/load-error":
      return { ...state, data: {}, waiting: false}; //@todo текст ошибки сохранить?

    case "comments/load-error":
      return { ...state, comments: [], waiting: false};

    default:
      // Нет изменений
      return state;
  }
}
