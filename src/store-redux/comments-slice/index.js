import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

// thunk для запроса всех комментов
export const fetchComments = createAsyncThunk(
  'comments/fetchAll',
  async (articleId, thunkApi) => {
    // thunkApi = {extra: services, ...} получаем Сервисы

    const services = thunkApi.extra;

    const response = await services.api.request({
      url: `/api/v1/comments?search[parent]=${articleId}&limit=*&skip=0&fields=*`
    });

    // трасформирую массив для получения промисов в имени автора комментария
    const responseWithUserNames = response.result.items.map(item => {
      return {
        ...item,
        authorName: services.api.request({
          url: `/api/v1/users/${item.author._id}?fields=profile`
        })
      };
    });

    return responseWithUserNames;
  }
);

// thunk для создания коммента по id родителя
export const createComment = createAsyncThunk(
  'comments/create',
  async (
    {parentId, text, parentType = 'article'},
    {extra: services, dispatch} // деструктуризация объетка thunkApi {extra, dispatch, ...rest}
  ) => {
    const body = {
      text,
      parent: {
        _id: parentId,
        _type: parentType
      }
    };

    const response = await services.api.request({
      url: 'api/v1/comments',
      method: 'POST',
      body: JSON.stringify(body)
    });

    // обновляем список комментариев
    // id article для запроса
    let id;

    if (parentType === 'article') {
      id = response?.result?.parent?._id;
    } else if (parentType === 'comment') {
      // получаем id article
      let treeArr = response?.result?.parent?._tree;
      id = response?.result?.parent?._tree[treeArr.length - 1]['_id'];
    }

    if (id) {
      dispatch(fetchComments(id));
    }

    return response.result;
  }
);

// Начальное состояние среза comments
const initialState = {
  data: [],
  waiting: false,
  error: {},
  isNewCommentFormVisible: true
};

// Срез comments
const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    formShow(state) {
      state.isNewCommentFormVisible = true;
    },
    formHide(state) {
      state.isNewCommentFormVisible = false;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchComments.pending, (state, action) => {
        state.waiting = true;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.waiting = false;
        state.data = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.waiting = false;
        state.error = action.error;
      });
  }
});

// Cелекторы состояния из среза comments
export const isFormVisible = state => state.comments.isNewCommentFormVisible;
export const selectAllComments = state => state.comments.data;
export const selectCommentsTotal = state => state.comments.data.length;

// Action creator-ы переключения видимости формы создания нового комментария
export const {formHide, formShow} = commentsSlice.actions;
export default commentsSlice.reducer;
