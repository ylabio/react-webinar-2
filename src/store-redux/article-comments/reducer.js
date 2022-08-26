import {COMMENTS_LOAD, COMMENTS_LOAD_SUCCESS,  COMMENT_ERROR} from './action'

const initialState = {
    items: [],
    article: "",
    count: 0,
    waiting: false,
}

export default function reducer(state = initialState, action){
    switch (action.type) {

        case COMMENTS_LOAD:
            return { ...state, items: [], count: 0, waiting: true};

        case COMMENTS_LOAD_SUCCESS:
            return { ...state, ...action.payload, waiting: false};



        case COMMENT_ERROR:
            return { ...state, items: [], count: 0, waiting: false};
        default:
            return state;
    }
}