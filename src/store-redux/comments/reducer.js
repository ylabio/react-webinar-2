// Начальное состояние товара
const initialState = {
  data: [],
  waiting: false,
  waitingSending: false,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/load":
      return {...state, waiting: true};

    case "comments/load-success":
      return {...state, data: action.payload.data, waiting: false};

    case "comments/load-error":
      return {...state, waiting: false};

    case "comments/send":
      return {...state, waitingSending: true};

    case "comments/send-success":
      return {...state, data: action.payload.data , waitingSending: false};

    case "comments/send-error":
      return {...state, waitingSending: false};

    default:
      // Нет изменений
      return state;
  }
}
