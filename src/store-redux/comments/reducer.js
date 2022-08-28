// Начальное состояние для управления модалками
const initialState = {
  data: {},
  waiting: false,
  total: 0,
  productId: null,
  branchesState: {},
};

// Обработчик действий в redux
export default function(state = initialState, action){
  switch (action.type) {
    case "comments/setBranches":
      return {...state, branchesState: {...state.branchesState, ...action.payload}};

    case "comments/setProductId":
      return { ...state, productId: action.payload};

    case "comments/create":
      return { ...state, waiting: true};

    case "comments/create-success":
      return { ...state, waiting: false};

    case "comments/create-error":
      return { ...state, waiting: false};
      
    case "comments/getAll":
      return { ...state, waiting: true, data: {}};

    case "comments/getAll-success":
      return { 
        ...state, 
        waiting: false, 
        data: action.payload.data, 
        total: action.payload.total
      };

    case "comments/getAll-error":
      return { ...state, waiting: false, data: {}}; 
   
    default:
      // Нет изменений
      return state;
  }
}
