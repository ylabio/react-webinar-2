// Начальное состояние товара
const initialState = {
  data: {},
  comData: [],
  lastCommented: '',
  waiting: false
}

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case "article/load":
      return { ...state, data: {}, waiting: true };

    case "article/load-success":
      return { ...state, data: action.payload.data, comData: action.comLoad.data, waiting: false };


    case "article/load-error":
      return { ...state, data: {}, waiting: false };

    case "article/send":
      return { ...state, waiting: true };

    case "article/send-success":
      return { ...state, lastCommented: action.lastCommented, waiting: false };

    case "article/send-error":
      return { ...state, waiting: false };

    default:
      // Нет изменений
      return state;
  }
}
