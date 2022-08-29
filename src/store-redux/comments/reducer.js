const initialState = {
    comData: [],
    lastCommented: '',
    waiting: false
}

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case "article/load-comments":
            return { ...state, comData: [], waiting: true };

        case "article/load-comments-success":
            return { ...state, comData: action.comLoad.data, waiting: false };


        case "article/load-comments-error":
            return { ...state, comData: [], waiting: false };

        case "article/send":
            return { ...state, waiting: true };

        case "article/send-success":
            return { ...state, lastCommented: action.lastCommented, waiting: false };

        case "article/send-error":
            return { ...state, waiting: false };

        default:
            // Нет изменений
            return state;
    }
}