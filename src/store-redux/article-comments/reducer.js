const initialState = {
  items: [],
  article: "",
  count: 0,
  waiting: false,
  commentAreaActive: ""
}

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case "comments/wait":
      return { ...state, items: [], count: 0, load: true };

    case "comments/load-success":
      return { ...state, ...action.payload, load: false };

    case "comments/load-error":
      return { ...state, items: [], count: 0, load: false };

    case "comment/open-area":
      return { ...state, ...action.payload }
    default:
      // Нет изменений
      return state;
  }
}