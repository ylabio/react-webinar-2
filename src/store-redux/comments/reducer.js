const initialState = {
  items: [],
  loading: false,
  error: false,
  parentId: '', // _id комментария/товара к которому пишется ответ
  sending: false, // отправка комментария
};

function reducer(state = initialState, action) {
  switch (action.type) {

    case 'comments/load':
      return {
        ...state,
        items: [],
        loading: true,
        error: false,
      };

    // parentId === article id, комментарий пишется к товару
    case 'comments/load-success':
      return {
        ...state,
        items: action.payload.items,
        loading: false,
        error: false,
        parentId: action.payload.parentId,
      };

    case 'comments/load-error':
      return {
        ...state,
        items: [],
        loading: false,
        error: true,
      };

    // переключение формы на другой коммент/товар
    // action.payload == "parentId"
    case 'comments/parentId-set':
      return {
        ...state,
        parentId: action.payload,
      };

    case 'comments/parentId-clear':
      return {
        ...state,
        parentId: '',
      };

    case 'comments/comment-sending':
      return {
        ...state,
        sending: true,
      };

    // action.payload == уже обработанный items с новым комментом
    // закрывает форму после отправки
    case 'comments/comment-added':
      return {
        ...state,
        items: action.payload,
        parentId: '',
        sending: false,
      };

    case 'comment/send-error':
      return {
        ...state,
        sending: false,
      };

    default:
      return state;
  }
}

export default reducer;