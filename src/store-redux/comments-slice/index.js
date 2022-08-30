import {createSlice} from '@reduxjs/toolkit';
import {fetchComments} from './thunks';

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
