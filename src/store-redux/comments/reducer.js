// Начальное состояние товара
const initialState = {
  data: [],
  waiting: false,
  textEditor: null,
}

export default function reducer(state = initialState, action){
  switch (action.type) {

    case "comments/load":
      return { ...state, data: [], waiting: true};

    case "comments/set-text-editor":
      return { ...state, textEditor: action.payload.data, waiting: false};

    case "comments/load-success":
      return { ...state, data: action.payload.data, waiting: false};

    case "comments/load-error":
      return { ...state, data: [], waiting: false}; //@todo текст ошибки сохранить?

    default:
      // Нет изменений
      return state;
  }
}
