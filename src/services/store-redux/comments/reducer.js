const initialState = {
  items: [],
  total: 0,
  waiting: false,
  form: {
    _id: 0,
    _type: ''
  },
  comment: ''
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'comments/load':
      return {
        ...state,
        items: [],
        total: 0,
        waiting: true
      };

    case 'comments/load-success':
      return {
        ...state,
        items: action.payload.comments,
        total: action.payload.total,
        waiting: false
      };

    case 'comments/load-error':
      return {...state, items: [], total: 0, waiting: false};

    case 'comments/set-form':
      return {...state, form: action.payload.form, comment: ''};

    case 'comments/edit':
      return {...state, comment: action.payload.updated};

    case 'comments/post':
      return {...state, waiting: true};

    case 'comments/post-success':
      const parentIndex = state.items.findIndex(item => item.data._id === action.payload.parentId);
      let newArr = [];
      if (parentIndex === -1) {
        newArr = [...state.items, {data: action.payload.newItem, level: 0}];
      } else {
        let placeIndex = state.items.findIndex(
          (item, index) => index > parentIndex && item.level === state.items[parentIndex].level
        );

        placeIndex === -1 ? (placeIndex = state.items.length) : (placeIndex -= 1);

        newArr = state.items
          .slice(0, placeIndex + 1)
          .concat({data: action.payload.newItem, level: state.items[parentIndex].level + 1})
          .concat(state.items.slice(placeIndex + 1));
      }

      return {...state, waiting: false, items: newArr, total: newArr.length};

    default:
      return {...state};
  }
}
