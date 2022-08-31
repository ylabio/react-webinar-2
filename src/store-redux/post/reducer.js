
const initialState = {
    result: {} ,
    waiting: false
  }
  
  export default function reducer(state = initialState, action){
    switch (action.type) {
        
    case "comment/post":
      return { ...state, data: {}, waiting: true};

      case "comment/post-success":
        return { ...state, data: action.payload.data, waiting: false};
  
      case "comment/post-error":
        return { ...state, data: action.payload.data, waiting: false};
  
      default:
        
        return state;
    }
  }