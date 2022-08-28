// Начальное состояние для комментариев
const initialState = {
  count: '',
  items: [],
  error: '',
  waiting: false,
  article: ''
}

// Обработчик действий в redux
export default function(state = initialState, action){
  switch (action.type) {
    case "comments/load":
      return { ...state, count: 0, items: [], error: '', waiting: true};
    case "comments/load-success":
      return { ...state, ...action.payload, waiting: false};
    case "comments/load-error":
      return { ...state, count: 0, items: [], error : action.payload.error, waiting: false};
    case "comments/send":
      return { ...state, error : '', waiting: true};
    case "comments/send-error":
      return { ...state, error: action.payload.error, waiting: false};
    default:
      // Нет изменений
      return state;
  }
}
