import simplifyErrors from '../../utils/simplify-errors';

export default {

  load: (id) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'comments/load' });

      try {
        const json = await services.api.request({
          url: `/api/v1/comments?search[parent]=${id}&limit=*&fields=items(*,author(profile(name)))`
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

  send: (comment) => {
    //console.log('to send:', comment)
    return async (dispatch, getState, services) => {
      try {
        dispatch({ type: 'comments/send' });

        const body_ = {
          text: comment.text,
          parent: {
            _id: comment.parentId || comment.id,
            _type: comment.parentId ? 'comment' : 'article'
          }
        };

        const json = await services.api.request({
          url: `/api/v1/comments?fields=*,author(profile(name))`,
          method: 'POST',
          body: JSON.stringify(body_)
        });

        dispatch({ type: 'comments/send-success', payload: { data: json.result } });

      } catch (e) {
        // Ошибка при загрузке
        dispatch({ type: 'comments/send-error' });
      }
    }
  },
};