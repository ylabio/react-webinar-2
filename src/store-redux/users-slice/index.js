import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';
import {arrayToMap} from '../../utils/arrayToMap';

export const fetchAllUsers = createAsyncThunk(
  'users/fetchAll',
  async (_, thunkApi) => {
    const services = thunkApi.extra;

    const response = await services.api.request({
      url: `/api/v1/users?fields=profile&limit=*`
    });

    const usersMappedToId = arrayToMap(response?.result?.items);
    return usersMappedToId;
  }
);

const initialState = {
  data: [],
  waiting: false,
  error: {}
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAllUsers.pending, (state, action) => {
        state.waiting = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.waiting = false;
        state.data = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.waiting = false;
        state.error = action.error;
      });
  }
});

export const selectUserById = (state, id) => state.users.data[id];

export default usersSlice.reducer;
