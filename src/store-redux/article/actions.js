import simplifyErrors from '../../utils/simplify-errors';

export default {

  load: (_id) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'article/load', });

      try {
        const json = await services.api.request({ url: `/api/v1/articles/${_id}?fields=*,maidIn(title,code),category(title)` });

        if (json.error) {
          // Ошибка при загрузке
          dispatch({ type: 'article/load-error', payload: { error: simplifyErrors(json.error.data.issues) } });
        } else {
          // Товар загружен успешно
          dispatch({ type: 'article/load-success', payload: { data: json.result } });
        }

      } catch (e) {
        // Ошибка при загрузке
        dispatch({ type: 'article/load-error' });
      }
    };
  },
};
