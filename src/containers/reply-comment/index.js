import React, {useCallback, useState} from 'react';
import propTypes from 'prop-types';

import LayoutFlex from '../../components/layout-flex';
import Input from '../../components/input';
import Field from '../../components/field';
import {formShow} from '../../store-redux/comments-slice';
import {createComment} from '../../store-redux/comments-slice/thunks';
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

        // сброс поля ввода, закрытие формы, открытие формы создания нового комментария, если коммент создан удачно
        onCancel(false);
      },
      [data]
    ),

    onCancel: useCallback(() => {
      // прячем текущую форму
      onCancel(false);
      // показываем главную форму добавления комментария
      dispatch(formShow());
      setData(prev => ({...prev, comment: ''}));
    })
  };

  return (
    <LayoutFlex indent={'none'}>
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

        <LayoutFlex indent={'none'}>
          <button disabled={!data.comment} type="submit">
            Отправить
          </button>
          <button disabled={false} type="button" onClick={callbacks.onCancel}>
            Отмена
          </button>
        </LayoutFlex>
      </form>
    </LayoutFlex>
  );
}

ReplyComment.propTypes = {
  parentId: propTypes.string,
  onCancel: propTypes.func
};

export default React.memo(ReplyComment);
