const initialState = {
  items: [],
  total: 0,
  waiting: false,
  formPlacement: 0
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'comments/load':
      return {...state, items: [], total: 0, waiting: true, formPlacement: action.payload._id};

    case 'comments/load-success':
      return {
        ...state,
        items: action.payload.comments,
        total: action.payload.total,
        waiting: false
      };

    case 'comments/load-error':
      return {...state, items: [], total: 0, waiting: false};

    case 'comments/set-form-placement':
      return {...state, formPlacement: action.payload.formPlacement};

    case 'comments/post':
      return {...state, waiting: true};

    default:
      return {...state};
  }
}
