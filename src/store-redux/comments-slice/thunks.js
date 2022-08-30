import {createAsyncThunk} from '@reduxjs/toolkit';

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
    // const responseWithUserNames = response.result.items.map(item => {
    //   return {
    //     ...item,
    //     authorName: services.api.request({
    //       url: `/api/v1/users/${item.author._id}?fields=profile`
    //     })
    //   };
    // });

    return response.result.items;
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
      // если родитель комментария другой комментарий
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
