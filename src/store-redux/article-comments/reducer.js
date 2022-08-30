import {COMMENTS_LOAD, COMMENTS_LOAD_SUCCESS,  COMMENT_ERROR, SLICE_COMMENT, SLICE_RESET} from './action'

const initialState = {
    items: [],
    article: "",
    count: 0,
    waiting: false,
    sliceComment: 10
}

export default function reducer(state = initialState, action){
    switch (action.type) {

        case COMMENTS_LOAD:
            return { ...state, items: [], count: 0, waiting: true};

        case COMMENTS_LOAD_SUCCESS:
            return { ...state, ...action.payload, waiting: false};



        case COMMENT_ERROR:
            return { ...state, items: [], count: 0, waiting: false};

        case SLICE_COMMENT:
            return {...state, sliceComment: state.sliceComment + 10}

        case SLICE_RESET:
            return {...state, sliceComment: 10}
        default:
            return state;
    }
}