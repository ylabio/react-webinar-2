const initialState = {
  data: [],
  waiting: false,
  textEditor: 'null',
  rerender: false,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case "comments/load":
      return {...state, waiting: true, rerender: false};

    case "comments/set-text-editor":
      return {...state, textEditor: action.payload.data, waiting: false};

    case "comments/load-success":
      return {...state, data: action.payload.data};

    case "comments/add-success":
      return {...state, rerender: true, waiting: false};

    default:
      // Нет изменений
      return state;
  }
}
