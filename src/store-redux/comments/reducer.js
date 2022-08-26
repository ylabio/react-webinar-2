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
      return { ...state, data: {}, waiting: false}; //@todo текст ошибки сохранить?
    case "comments/post-success":
      return { ...state, data: {
        items: state.data.items.concat(action.payload.data),
        count: state.data.count + 1
      }, waiting: false }
    case 'comments/post-error':
      return {...state, data: {}, waiting: false}
    default:
      // Нет изменений
      return state;
  }
}