// Начальное состояние товара
const initialState = {
    data: [],
    waiting: false,
    numberOfComments: 0,
    resToUser: false,
    isAttemptAddNewComment: false,
    newCommentText: '',
    parentIdNewComment: '',
    parentTypeNewComment: ''
  }
  
  export default function reducer(state = initialState, action){
    switch (action.type) {
  
      case "comments/load":
        return { ...state, data: [], waiting: true,    isAttemptAddNewComment: false,
     };
  
      case "comments/load-success":
        return { ...state, 
                 data: action.payload.data.items,
                 waiting: false,
                 numberOfComments: action.payload.data.items.length,
              };
  
      case "comments/load-error":
        return { ...state, data: [], waiting: false}; //@todo текст ошибки сохранить?

      case "comments/add":

        return { ...state, waiting: true};

      case "comments/add-success":
        return { ...state, data: [...data, action.payload.data], waiting: false, numberOfComments: data.length};
          
      case "comments/add-error":
        return { ...state, data: [], waiting: false}; 
           
      case 'comments/attemptAddNewComment':
        return { ...state, ...action.payload, isAttemptAddNewComment: true}; 

      default:
        // Нет изменений
        return state;
    }
  }
  