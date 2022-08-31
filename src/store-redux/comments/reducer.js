
const initialState = {
  active: 'article',
  data: {} ,
  selected: null,
  waiting: false
}
  
  export default function reducer(state = initialState, action){
    switch (action.type) {
      case "comments/set-active-field":
        return {...state, active: action.payload, waiting: false}

      case "comments/set-active-item":
        return {...state, selected: action.payload, waiting: false}
  
      case "comments/load":
        return { ...state, data: {}, waiting: false};
  
      case "comments/load-success":
        return { ...state, data: action.payload.data, waiting: false};
  
      case "comments/load-error":
        return { ...state, data: {}, waiting: false};
  
      default:  
        return state;
    }
  }
  