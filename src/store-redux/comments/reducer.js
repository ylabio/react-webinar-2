const initialState = {
  data: [],
  count: 0,
  waiting: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/load":
      return { ...state, data: [], count: 0, waiting: true };

    case "comments/load-success":
      return {
        ...state,
        data: action.payload.data,
        count: action.payload.count,
        waiting: false,
      };

    case "comments/load-error":
      return { ...state, waiting: false };

    case "comments/create":
      return { ...state, waiting: false };

    case "comments/create-success":
      return {
        ...state,
        data: action.payload.data,
        count: state.count + 1,
        waiting: false,
      };

    case "comments/create-error":
      return { ...state, waiting: false };

    default:
      // Нет изменений
      return state;
  }
}
