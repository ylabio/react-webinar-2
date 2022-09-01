const initialState = {
    comData: [],
    newComments: []
}

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case "comments/load-comments":
            return { ...state, comData: [] };

        case "comments/load-comments-success":
            return { ...state, comData: action.comLoad.data };


        case "comments/load-comments-error":
            return { ...state, comData: [] };

        case "comments/send":
            return { ...state };

        case "comments/send-success":
            return { ...state, newComments: action.newComments, comData: [...action.newComments] };

        case "comments/send-error":
            return { ...state };

        default:
            // Нет изменений
            return state;
    }
}