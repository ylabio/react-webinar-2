const initialState = {
  items: [],
  total: 0,
  waiting: false,
  formPlacement: 0
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'comments/load':
      return {...state, comments: [], total: 0, waiting: true};

    case 'comments/load-success':
      return {
        ...state,
        items: action.payload.comments,
        total: action.payload.total,
        waiting: false
      };

    case 'comments/load-error':
      return {...state, comments: [], total: 0, waiting: false};
    default:
      return {...state};
  }
}
