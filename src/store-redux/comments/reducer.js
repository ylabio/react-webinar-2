// Начальное состояние списка комментариев
const initialState = {
    items: [],
    waiting: false,
    error: ''
  }
  
  export default function reducer(state = initialState, action){
    switch (action.type) {
  
      case "comments/load":
        return { ...state, items: [], waiting: true};
  
      case "comments/load-success":
        return { ...state, items: action.payload.data, waiting: false};
  
      case "comments/load-error":
        return { ...state, items: [], waiting: false, error: 'Не удалось загрузить комментарии'}; //@todo текст ошибки сохранить?

      case "comments/post":
        return { ...state, waiting: true};
      
      case "comments/post-success":
        return { ...state, items: state.items.concat(action.payload.data), waiting: false};

      case "comments/post-error":
        return { ...state, waiting: false, error: 'Не удалось опубликовать комментарий'}; //@todo текст ошибки сохранить?

      case "comments/clear-error":
        return { ...state, error: ''};
  
      default:
        // Нет изменений
        return state;
    }
  }