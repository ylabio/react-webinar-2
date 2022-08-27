const initialState = {
    data: [],
    waiting: false,
    error: ''
}

export default function reducer(state = initialState, action){
    switch (action.type) {

        case "comments/load":
            return { ...state, data: [], waiting: true, error: ''};

        case "comments/load-success":
            return { ...state, data: action.payload.data, waiting: false};

        case "comments/load-error":
            return { ...state, data: {}, waiting: false, error: action.payload.message}; //@todo текст ошибки сохранить?

        case "comments/create-start":
            return {...state, waiting: true}

        case "comments/create-success":
            return {...state, waiting: false, error: '', data: [...state.data, action.payload.data]}

        case "comments/create-error":
            return { ...state, data: {}, waiting: false, error: action.payload.message};

        default:
            // Нет изменений
            return state;
    }
}