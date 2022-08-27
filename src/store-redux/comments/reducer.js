// Начальное состояние комментариев
const initialState = {
  data: [],
  count: null,
  waiting: false
}

export default function reducer(state = initialState, action){
  switch (action.type) {

    case "comments/load":
      return { ...state, data: [], waiting: true};

    case "comments/load-success":
      return { ...state, data: action.payload.data.items, count: action.payload.data.count, waiting: false};

    case "comments/load-error":
      return { ...state, data: [], waiting: false}; //@todo текст ошибки сохранить?

    case "comments/add":
      return { ...state, data: [], waiting: true};

    case "comments/add-success":
      return { ...state, data: action.payload.data, waiting: false};

    case "comments/add-error":
      return { ...state, data: [], waiting: false}; //@todo текст ошибки сохранить?

    default:
      // Нет изменений
      return state;
  }
}
