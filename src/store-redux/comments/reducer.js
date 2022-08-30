// Начальное состояние товара
const initialState = {
  data: [],
  waiting: false
}

export default function reducer(state = initialState, action){
  switch (action.type) {

    case "comment/load":
      return { ...state, data: state.data, waiting: true};

    case "comment/load-success":
      return { ...state, data: action.payload.data, waiting: false};

    case "comment/load-error":
      return { ...state, data: [], waiting: false}; //@todo текст ошибки сохранить?

    default:
      // Нет изменений
      return state;
  }
}
