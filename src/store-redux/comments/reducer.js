const initialState = {
    comments: [],
}

export default function reducer(state = initialState, action){
    switch (action.type) {
        case "article/comments": {
            return { ...state, comments: [], waiting: false};
        }

        case "article/comments-success":
            return { ...state, comments: action.payload, waiting: false};

        case "article/comments-error":
            return { ...state, comments: [], waiting: false};

        case "article/comments-add-success":
            return { ...state, comments: { ...state.comments, comments: [ ...state.comments.comments, action.payload ] }, waiting: false};
        default:
            // Нет изменений
            return state;
    }
}