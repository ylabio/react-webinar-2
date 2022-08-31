import React, {useCallback, useState} from 'react';
import propTypes from 'prop-types';

import LayoutFlex from '../layout-flex';
import Input from '../input';
import Field from '../field';
import {createComment} from '../../store-redux/comments-slice/thunks';
import {useDispatch} from 'react-redux';
import TextArea from '../text-area';

function NewComment({parentId}) {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    comment: ''
  });

  const callbacks = {
    onChange: useCallback((value, name) => {
      setData(prevData => ({...prevData, [name]: value}));
    }, []),

    onSubmit: useCallback(
      async e => {
        e.preventDefault();
        // вызов асинхронного thunk
        if (data) {
          await dispatch(
            createComment({parentId, text: data.comment})
          ).unwrap();
        }

        setData({comment: ''});
      },
      [data]
    )
  };

  return (
    <form onSubmit={callbacks.onSubmit}>
      <h5>Новый комментарий</h5>
      <Field label={''} error={''} spacing={'small'}>
        <TextArea
          theme={'wide'}
          name="comment"
          onChange={callbacks.onChange}
          value={data.comment}
        />
      </Field>
      <Field spacing={'small'}>
        <button disabled={!data.comment} type="submit">
          Отправить
        </button>
      </Field>
    </form>
  );
}

NewComment.propTypes = {
  parentId: propTypes.string
};

export default React.memo(NewComment);

// TODO: заменить input на textarea {resize: none}
// TODO: валидация ??
