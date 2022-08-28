// Начальное состояние товара
const initialState = {
  errors:'',
  waiting: false,
  inTheAnd: true
}

export default function reducer(state = initialState, action){
  switch (action.type) {

    case "сomment/sending":
      return { ...state, waiting: true};

    case "сomments/sending-success":
      return { ...state, waiting: false, inTheAnd: true};

    case "сomments/sending-error":
      return { ...state, errors: action.payload.errors,
        waiting: false}; //@todo текст ошибки сохранить?

    default:
      // Нет изменений
      return state;
  }
}
