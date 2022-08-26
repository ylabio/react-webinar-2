// Начальное состояние комментариев
const initialState = {
  items: [],
  count: 0,
  waiting: false,
  replyOpenStatus: null,
  sendStatus: null,
  sendWaiting: false,
}

export default function reducer(state = initialState, action){
  switch (action.type) {

    case "comments/load":
      return { ...state, items: [], count: 0, waiting: true};

    case "comments/load-success":
      return { ...state, items: action.payload.data.items, count: action.payload.data.count, waiting: false};

    case "comments/load-error":
      return { ...state, items: [], count: 0, waiting: false, replyOpenStatus: null};

    case "comments/reply-open":
      return { ...state, replyOpenStatus: action.payload.data};

    case "comments/send":
      console.log('work');
      return { ...state, sendWaiting: true};

    case "comments/send-success":
      return { ...state,
        sendWaiting: false,
        sendStatus: action.payload.data,
        items: [...state.items, action.payload.data],
        count: state.count + 1,
        replyOpenStatus: null
      };

    case "comments/send-error":
      return { ...state, sendWaiting: false};

    default:
      return state;
  }
}
