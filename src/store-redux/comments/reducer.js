const initialState = {
  items: [],
  waiting: false,
  parentId: '',
  error: null,
};

function reducer(state = initialState, action) {
  switch (action.type) {

    case 'comments/load':
      return {
        ...state,
        items: [],
        waiting: true,
      };

    case 'comments/load-success':
      return {
        ...state,
        items: action.payload.items,
        waiting: false,
        parentId: action.payload.parentId,
      };

    case 'comments/load-error':
      return {
        ...state,
        items: [],
        waiting: false,
        error: action.payload.error,
      };

    case 'comments/setParentId':
      return {
        ...state,
        parentId: action.payload,
      };

    case 'comments/comment-added':
      return {
        ...state,
        items: action.payload,
        parentId: '',
      };

    default:
      return state;
  }
}

export default reducer;