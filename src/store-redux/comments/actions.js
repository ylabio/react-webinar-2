import simplifyErrors from '../../utils/simplify-errors';

export default {

  load: (_id) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'comments/load', });

      try {
        const json = await services.api.request({
          url: `/api/v1/comments?search[parent]=${_id}&limit=*&fields=items(*,author(profile(name))),count`
        });

        if (json.error) {
          // Ошибка при загрузке
          dispatch({ type: 'comments/load-error', payload: { error: simplifyErrors(json.error.data.issues) } });
        } else {
          // Комментарии успешно загружены
          dispatch({ type: 'comments/load-success', payload: { data: json.result } });
        }

      } catch (e) {
        // Ошибка при загрузке
        dispatch({ type: 'comments/load-error', payload: { error: e.message } });
      }
    };
  },

  upload: (text, parent) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'comments/upload', });

      try {
        const json = await services.api.request({
          method: 'POST',
          url: `/api/v1/comments?fields=*,author(profile(name))`,
          body: JSON.stringify({
            text,
            parent
          })
        });

        if (json.error) {
          // Ошибка при загрузке
          dispatch({ type: 'comments/upload-error', payload: { error: simplifyErrors(json.error.data.issues) } });
        } else {
          // Комментарий успешно загружен
          dispatch({ type: 'comments/upload-success', payload: { data: json.result } });
        }

      } catch (e) {
        // Ошибка при загрузке
        dispatch({ type: 'comments/upload-error', payload: { error: e.message } });
      }
    };
  },
};
