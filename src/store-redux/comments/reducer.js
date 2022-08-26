// Начальное состояние комментариев
import {commentToTree, treeToComment} from "../../utils/refactor-comments";

const initialState = {
  data: [],
  count: 0,
  waiting: false,
  error : '',
}

export default function reducer(state = initialState, action){
  switch (action.type) {

    case "comments/load":
      return { ...state, data: [], count: 0, waiting: true, error : '',};

    case "comments/load-success":
      return {
        ...state,
        data: [
          ...treeToComment(
            commentToTree(action.payload.data),
            (item, level) => ({...item, active: false, level: level, main: false, hide: level < 3})
          ),
          {_id: '0', active: true, level: 0, main: true}
        ],
        count: action.payload.count,
        waiting: false};

    case "comments/load-error":
      return { ...state, data: [], count: 0, waiting: false, error : action.payload.error};

    case "comments/add-comment":
      return { ...state, waiting: true, error : '',};

    case "comments/add-comment-success":
      return {
        ...state,
        waiting: false,
        data: [
        ...treeToComment(
          commentToTree([...state.data.filter(item => item._id !== '0'),
            {...action.payload, hide: true}]),
          (item, level) => ({...item, level: level, active: false, main: false,})
        ),
          {_id: '0', active: true, level: 0, main: true, hide: true}
    ],
        count: state.count + 1,
      };

    case "comments/add-comment-error":
      return { ...state, waiting: false, error : action.payload.error};

    case "comments/answer":
      return {
        ...state,
        data: state.data.map(item => {
          item.active = action.payload === item._id;
          return item;
        })};

    case "comments/close":
      return {
        ...state,
        data: state.data.map(item => {
          item.active = item._id === '0';
          return item;
        })};

    case "comments/hide":
      return {
        ...state,
        data: state.data.map(item => {
          if (item._id === action.payload) {
            item.hide = true;
          }

          return item;
        })};

    default:
      // Нет изменений
      return state;
  }
}