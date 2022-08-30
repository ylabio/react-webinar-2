// Начальное состояние товара
const initialState = {
  _id: "",
  text: '',
  parent: {}
}

export default function reducer(state = initialState, action){
  switch (action.type) {

    case "comment/input":
      return { ...state, text: action.payload};

    case "comment/post":
      return { ...state, parent: action.payload,};

    case "comment/reset":
      return { ...state, id: '', text: '', parent: {}};
    // case "comment/load-error":
    //   return { ...state, data: [], waiting: false}; //@todo текст ошибки сохранить?

    default:
      // Нет изменений
      return state;
  }
}
