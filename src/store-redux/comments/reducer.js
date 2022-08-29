const initialState = {
  data: [],
  count: 0,
  waiting: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'comments/load':
      return { ...state, data: [], count: 0, waiting: true };

    case 'comments/load-success':
      return {
        ...state,
        data: action.payload.data,
        count: action.payload.count,
        waiting: false,
      };

    case 'comments/load-error':
      return { ...state, data: [], waiting: false };

    case 'comments/post':
      return { ...state, waiting: true };

    case 'comments/post-success':
      return { ...state, waiting: false };

    case 'comments/post-error':
      return { ...state, waiting: false };

    default:
      return state;
  }
}
