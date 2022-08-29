const initState = {
  comments: [],
  count: 0,
  isReplying: '',
  error: false,
  loadWaiting: false,
  sendWaiting: false,
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case 'comments/load':
      return { ...state, loadWaiting: true };

    case 'comments/load-success':
      return {
        ...state,
        comments: action.payload.result.items,
        count: action.payload.result.count,
        loadWaiting: false,
      };

    case 'comments/load-error':
      return {
        ...state,
        comments: [],
        count: 0,
        loadWaiting: false,
        isReplying: '',
        error: true,
      };

    case 'comments/reply':
      return {
        ...state,
        isReplying: action.payload,
        error: false,
      };

    case 'comments/send':
      return { ...state, sendWaiting: true, error: false };

    case 'comments/send-success':
      return {
        ...state,
        comments: [...state.comments, action.payload.result],
        count: (state.count += 1),
        isReplying: '',
        error: false,
        sendWaiting: false,
      };

    case 'comments/send-error':
      return { ...state, sendWaiting: false, error: true };

    default:
      return state;
  }
}
