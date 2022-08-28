const initialState = {
  items: [],
  loading: false,
  parentId: '', // _id комментария / товара к которому пишется ответ
};

function reducer(state = initialState, action) {
  switch (action.type) {

    case 'comments/load':
      return {
        ...state,
        items: [],
        loading: true,
      };

    case 'comments/load-success':
      return {
        ...state,
        items: action.payload.items,
        loading: false,
        parentId: action.payload.parentId,
        // тут parentId === article id, форма открыта под всеми комментами
      };

    case 'comments/load-error':
      return {
        ...state,
        items: [],
        loading: false,
      };

    case 'comments/setParentId':
      return {
        ...state,
        parentId: action.payload,
        // переключение формы на другой коммент
      };

    case 'comments/comment-added':
      return {
        ...state,
        items: action.payload,
        // передаётся уже обработанный массив
        parentId: '',
        // закрытие формы после отправки
      };

    default:
      return state;
  }
}

export default reducer;