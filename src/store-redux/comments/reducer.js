// Начальное состояние комментариев
const initialState = {
  items: [],
  count: 0,
  waiting: false,
  replyOpenStatus: null,
  sendStatus: null,
  sendWaiting: false,
  error: false,
}

export default function reducer(state = initialState, action){
  switch (action.type) {

    case "comments/load":
      return { ...state, items: [], count: 0, waiting: true,  error: false};

    case "comments/load-success":
      return { ...state, items: action.payload.data.items, count: action.payload.data.count, waiting: false};

    case "comments/load-error":
      return { ...state, items: [], count: 0, waiting: false, replyOpenStatus: null};

    case "comments/reply-open":
      return { ...state, replyOpenStatus: action.payload.data,  error: false,};

    case "comments/send":
      console.log('work');
      return { ...state, sendWaiting: true,  error: false,};

    case "comments/send-success":
      return { ...state,
        sendWaiting: false,
        sendStatus: action.payload.data,
        items: [...state.items, action.payload.data],
        count: state.count + 1,
        replyOpenStatus: null,
        error: false,
      };

    case "comments/send-error":
      return { ...state, sendWaiting: false, error: true};

    case "comments/reset-error":
      return { ...state, error: false};

    default:
      return state;
  }
}
