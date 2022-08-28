import React, {useCallback, useState} from 'react';
import propTypes from 'prop-types';

import LayoutFlex from '../../components/layout-flex';
import Input from '../../components/input';
import Field from '../../components/field';
import {createComment} from '../../store-redux/comments-slice';
import {useDispatch} from 'react-redux';

function ReplyComment({parentId, onCancel}) {
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
        await dispatch(
          createComment({parentId, text: data.comment, parentType: 'comment'})
        ).unwrap();

        // сброс поля ввода если коммент создан удачно
        setData(prev => ({...prev, comment: ''}));
      },
      [data]
    ),

    onCancel: useCallback(() => {
      onCancel(false);
      setData(prev => ({...prev, comment: ''}));
    })
  };

  return (
    <LayoutFlex indent={'small'} grow>
      <form onSubmit={callbacks.onSubmit}>
        <h5>Новый ответ</h5>
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
          <button disabled={false} type="button" onClick={callbacks.onCancel}>
            Отмена
          </button>
        </Field>
      </form>
    </LayoutFlex>
  );
}

ReplyComment.propTypes = {
  parentId: propTypes.string
};

export default React.memo(ReplyComment);
