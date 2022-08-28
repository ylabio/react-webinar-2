import React, {useCallback, useState} from 'react';
import propTypes from 'prop-types';

import LayoutFlex from '../layout-flex';
import Input from '../input';
import Field from '../field';
import {createComment} from '../../store-redux/comments-slice';
import {useDispatch} from 'react-redux';

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
        await dispatch(createComment({parentId, text: data.comment}));

        setData({comment: ''});
      },
      [data]
    )
  };

  return (
    <LayoutFlex indent={'small'}>
      <form onSubmit={callbacks.onSubmit}>
        <h5>Новый комментарий</h5>
        <Field label={''} error={''} spacing={'small'}>
          <Input
            theme={'wide'}
            name="comment"
            type="text"
            onChange={callbacks.onChange}
            value={data.comment}
          />
        </Field>
        <Field spacing={'small'}>
          <button disabled={false} type="submit">
            Отправить
          </button>
        </Field>
      </form>
    </LayoutFlex>
  );
}

NewComment.propTypes = {
  parentId: propTypes.string
};

export default React.memo(NewComment);

// TODO: заменить input на textarea {resize: none}
// TODO: валидация ??
