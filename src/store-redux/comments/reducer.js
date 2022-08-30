// Начальное состояние товара
const initialState = {
  data: [],
  waiting: false,
  commentId: '',
}

export default function reducer(state = initialState, action){
  switch (action.type) {

    case "comments/load":
      return { ...state, data: [], waiting: true};

    case "comments/load-success":
      return { ...state, data: action.payload.data, waiting: false};

    case "comments/load-error":
      return { ...state, data: [], waiting: false};

    case "comments/set-id":
      return { ...state, commentId: action.payload.id};
    
    case "comments/send":
      return { ...state, waiting: true};

    case "comments/send-success":
      return { ...state, data: [...state.data, action.payload.data], waiting: false};

    case "comments/send-error":
      return { ...state, waiting: false};

    default:
      return state;
  }
}
