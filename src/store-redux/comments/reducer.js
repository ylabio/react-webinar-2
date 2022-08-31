// Начальное состояние комментариев
const initialState = {
  data: [],
  count: null,
  answeringComment:null,
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

    case "comments/answer":
      return { ...state, answeringComment: action.id};
    case "comments/add":
      return { ...state, waiting: true};

    case "comments/add-success":
      return { ...state, 
        data: [
        ...state.data, 
          action.payload
        // state.data.find(item=>{
        // item._id === action.payload.parent._id 
        // ? item.children.push(action.payload) : item
        // })
        ],answeringComment: null, waiting: false
      };

    case "comments/add-error":
      return { ...state, data: [], waiting: false};

    default:
      // Нет изменений
      return state;
  }
}
