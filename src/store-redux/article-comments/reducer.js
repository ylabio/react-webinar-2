// Начальное состояние товара
const initialState = {
  data: [],
  count: 0,
  lastId: '',
  waiting: false
}

export default function reducer(state = initialState, action){
  switch (action.type) {

    case "article-comments/load":
      return { ...state, data: [], waiting: true};

    case "article-comments/load-success":
      return { ...state, data: action.payload.data.items, count: action.payload.data.count, waiting: false};

    case "article-comments/load-error":
      return { ...state, data: [], waiting: false}; //@todo текст ошибки сохранить?

    case "article-comments/push":
      return { ...state, waiting: true};

    case "article-comments/push-complited":
      return { ...state, data: [...state.data, action.payload.data], lastId: action.payload.data._id, count: state.count + 1, waiting: false};

    case "article-comments/push-error":
      return { ...state, data: [], waiting: false, count: 0, lastId: ''};

    case "article-comments/clear-last-id":
      return { ...state, lastId: ''};

    default:
      // Нет изменений
      return state;
  }
}
