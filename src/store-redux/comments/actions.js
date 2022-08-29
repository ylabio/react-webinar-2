export default {
  load: (_id) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'comments/load' });
      try {
        const json = await services.api.request({
          url: `/api/v1/comments?search[parent]=${_id}&fields=_id,text,dateCreate,parent,author(profile(name))&limit=*`,
        });

        console.log(json.result.items);
        dispatch({
          type: 'comments/load-success',
          payload: {
            data: json.result.items.map((i) => {
              i.active = false;
              return i;
            }),
          },
        });
      } catch (e) {
        // Ошибка при загрузке
        dispatch({ type: 'comments/load-error' });
      }
    };
  },

  post: (data, userName, _id, comId) => {
    return async (dispatch, getState, services) => {
      try {
        await services.api.request({
          method: 'POST',
          url: '/api/v1/comments',
          body: JSON.stringify(data),
        });

        // загружем новый комментарий через запрос
        const json = await services.api.request({
          url: `/api/v1/comments?search[parent]=${_id}&fields=_id,text,dateCreate,parent,author(profile(name))&limit=*`,
        });
        dispatch({
          type: 'comments/load-success',
          payload: {
            data: json.result.items.map((i) => {
              if (i._id !== comId) {
                i.active = false;
              } else {
                i.active = true;
              }
              return i;
            }),
          },
        });
        // новый комментарий добавляем вручную
        // dispatch({
        //   type: 'comments/add',
        //   payload: {
        //     data: {
        //       ...json.result,
        //       author: { profile: { name: userName } },
        //       active: false,
        //     },
        //   },
        // });
        console.log('json:', json.result);
      } catch (e) {}
    };
  },

  show: (id) => {
    return (dispatch, getState, services) => {
      const com = getState().comments.data;
      com.map((i) => {
        if (i._id === id) {
          i.active = true;
        } else {
          i.active = false;
        }
        return i;
      });
      dispatch({ type: 'comments/show', payload: [...com] });
    };
  },

  hide: () => {
    return (dispatch, getState, services) => {
      const com = getState().comments.data;
      com.map((i) => {
        i.active = false;
        return i;
      });
      dispatch({ type: 'comments/show', payload: [...com] });
    };
  },
};
