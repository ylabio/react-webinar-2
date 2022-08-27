// Начальное состояние товара
const initialState = {
  data: {},
  waiting: false,
  comments: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "article/waiting":
    case "article/load":
    case "article/loadComments":
    case "article/load-success":
    case "article/loadComments-success":
    case "article/load-error":
    case "article/loadComments-error":
      return { ...state, ...action.payload };
    // return { ...state, data: {}, waiting: true};

    // case "article/load-success":
    // case "article/loadComments-success":
    //   return { ...state, data: action.payload.data, waiting: false };

    // case "article/load-error":
    // case "article/loadComments-error":
    //   return { ...state, data: {}, waiting: false }; //@todo текст ошибки сохранить?

    default:
      // Нет изменений
      return state;
  }
}
