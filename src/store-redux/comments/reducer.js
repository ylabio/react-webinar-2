// Начальное состояние товара
const initialState = {
  data: {},
  waiting: false
}

export default function reducer(state = initialState, action){
  switch (action.type) {

    case "comments/load":
      return { ...state, data: {}, waiting: true};

    case "comments/load-success":
      return { ...state, data: action.payload.data, waiting: false};

    case "comments/load-error":
      return { ...state, data: {}, waiting: false};

    case "comments/addComment":
      return { ...state, waiting: true};

    case "comments/addComment-success":
      return { ...state, data: {...state.data, items: [...state.data.items, action.payload.data] }, 
        waiting: false
      };
      
    case "comments/addComment-error":
      return { ...state, waiting: false};

    default:
      // Нет изменений
      return state;
  }
}