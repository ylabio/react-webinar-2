const initialState = {
    comData: [],
    lastCommented: '',
    waiting: false
}

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case "comments/load-comments":
            return { ...state, comData: [], waiting: true };

        case "comments/load-comments-success":
            return { ...state, comData: action.comLoad.data, waiting: false };


        case "comments/load-comments-error":
            return { ...state, comData: [], waiting: false };

        case "comments/send":
            return { ...state, waiting: true };

        case "comments/send-success":
            return { ...state, lastCommented: action.lastCommented, waiting: false };

        case "comments/send-error":
            return { ...state, waiting: false };

        default:
            // Нет изменений
            return state;
    }
}