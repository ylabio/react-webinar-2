// Начальное состояние комментариев
import listToTree from "../../utils/list-to-tree";
import treeToList from "../../utils/tree-to-list";

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
          ...treeToList(
            listToTree(action.payload.data),
            (item, level) => ({...item, active: false, level: level, main: false})
          ),
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
        ...treeToList(
          listToTree([...state.data, action.payload]),
          (item, level) => ({...item, level: level, active: false, main: false,})
        ),
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

    default:
      // Нет изменений
      return state;
  }
}