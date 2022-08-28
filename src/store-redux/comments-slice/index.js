import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const fetchComments = createAsyncThunk(
  'comments/fetchAll',
  async (articleId, thunkApi) => {
    // thunkApi = {extra: services, ...} получаем Сервисы

    const services = thunkApi.extra;

    const response = await services.api.request({
      url: `/api/v1/comments?search[parent]=${articleId}&limit=0&skip=0&fields=*`
    });

    return response.result.items;
  }
);

export const createComment = createAsyncThunk(
  'comments/create',
  async ({parentId, text}, {extra: services}) => {
    const body = {
      _id: 'string',
      text,
      parent: {
        id: parentId
      }
    };

    const response = await services.api.request({
      url: 'api/v1/comments',
      method: 'POST',
      body: JSON.stringify(body)
    });
    console.log(response);
    return response.result;
  }
);

const initialState = {
  data: [],
  waiting: false,
  error: {}
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchComments.pending, (state, action) => {
        state.waiting = true;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        console.log(action.payload);
        state.waiting = false;
        state.data = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.waiting = false;
        state.error = action.error;
      });
  }
});

export const selectAllComments = state => state.comments.data;
export const selectCommentsTotal = state => state.comments.data.length;

export default commentsSlice.reducer;
