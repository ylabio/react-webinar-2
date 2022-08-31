// Начальное состояние товара
const initialState = {
    data: [],
    waiting: false,
    numberOfComments: 0,
    isAttemptAddNewComment: false,
    newCommentText: '',
    parentIdNewComment: '',
    parentTypeNewComment: '',
    scrollCommentId: ''
  }
  
  export default function reducer(state = initialState, action){
    switch (action.type) {
  
      case "comments/load":
        return { ...state, data: [], waiting: true, isAttemptAddNewComment: false
     };
  
      case "comments/load-success":
        return { ...state, 
                 data: action.payload.data.items,
                 waiting: false,
                 numberOfComments: action.payload.data.items.length, 
                 newCommentText: '',
                 parentIdNewComment: '',
                 parentTypeNewComment: '',
                 scrollCommentId: ''      
              };
  
      case "comments/load-error":
        return { ...state, data: [], waiting: false}; 

      case "comments/add":
        return { ...state, waiting: true};

      case "comments/add-success":          
        return { ...state, 
                 data: [...state.data, action.payload.data], 
                 waiting: false, lastComment: action.payload.data._id, 
                 isAttemptAddNewComment: false, 
                 numberOfComments: state.numberOfComments + 1,
                 scrollCommentId: action.payload.data._id
               };
          
      case "comments/add-error":
        return { ...state, data: [], waiting: false}; 
           
      case 'comments/attemptAddNewComment':
        return { ...state, ...action.payload, isAttemptAddNewComment: true}; 

      default:
        // Нет изменений
        return state;
    }
  }
  