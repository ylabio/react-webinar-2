const initialState = {
  countAddComment: 0,
}

export default function reducer(state = initialState, action){
  switch (action.type) {

    case "comment/increaseСount":
      return { ...state, countAddComment: state.countAddComment + action.payload.countAddComment};

    case "comment/increaseСount-error":
      return { ...state, countAddComment: state.countAddComment};

    default:
      return state;
  }
}
