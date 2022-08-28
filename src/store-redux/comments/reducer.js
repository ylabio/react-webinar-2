// Начальное состояние для управления модалками
const initialState = {
  data: [],
  count: 0,
  waiting: false,
  currentOpenForm: '',
};

// Обработчик действий в redux
export default function (state = initialState, action) {
  switch (action.type) {
    case 'comments/load':
      return { ...state, waiting: true };

    case 'comments/load-success':
      return {
        ...state,
        data: action.payload.data,
        count: action.payload.count,
        waiting: false,
      };

    case 'comments/load-error':
      return { ...state, data: [], waiting: false }; //@todo текст ошибки сохранить?

    case 'comments/add-comment':
      return { ...state, data: [...state.data, { ...action.payload.newComment }] };

    case 'comments/change-current-open-form':
      return { ...state, currentOpenForm: action.payload.currentOpenForm };

    default:
      // Нет изменений
      return state;
  }
}
