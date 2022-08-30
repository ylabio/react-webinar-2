const initialState = {
  comments: [],
  count: 0,
  countAddComment: 0,
  waiting: false
}

export default function reducer(state = initialState, action){
  switch (action.type) {

    case "comments/load":
      return { ...state, comments: [], waiting: true};
    
    case "comments/load-success":
      return { ...state, comments: action.payload.comments, waiting: false};
    
    case "commentsCount/load-success":
      return { ...state, count: action.payload.commentsCount, waiting: false};

    case "comment/increaseСount":
      return { ...state, countAddComment: state.countAddComment + action.payload.countAddComment};

    case "comment/increaseСount-error":
      return { ...state, countAddComment: state.countAddComment};

    case "comments/load-error":
      return { ...state, comments: [], waiting: false};

    default:
      return state;
  }
}
