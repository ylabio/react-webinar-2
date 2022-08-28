// Начальное состояние товара
const initialState = {
  data: [],
  count: 0,
  waiting: false
}

export default function reducer(state = initialState, action){
  
  switch (action.type) {

    case "comments/load":
      return { ...state, waiting: true};

    case "comments/load-success":
      return { ...state, data: action.payload.data.items, count: action.payload.data.count, waiting: false};

    case "comments/load-error":
      return { ...state, data: [], waiting: false}; //@todo текст ошибки сохранить?
    
    case "comments/create-success":
      return { ...state, data: [...state.data, action.payload.data], count: state.count + 1, waiting: false};

    case "comments/create-error":
      return { ...state, waiting: false};

    default:
      // Нет изменений
      return state;
  }
}
