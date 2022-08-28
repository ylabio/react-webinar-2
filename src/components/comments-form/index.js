import React, {useCallback, useState} from 'react';
import propTypes from 'prop-types';
import {Link} from "react-router-dom";
import {cn as bem} from "@bem-react/classname";
import actionsInputComments from '../../store-redux/comments_creator/actions';
import {useStore as useStoreRedux, useSelector as useSelectorRedux, shallowEqual, useDispatch} from "react-redux";
import './style.css';

function CommentsForm(props) {
  const cn = bem('CommentsForm');
  const [text, setText] = useState()
  const dispatch = useDispatch()

  const token = props.token
  const storeRedux = useStoreRedux();

  const onChange = useCallback(event => {
    dispatch({type: 'comment/input', payload: event.target.value})
    setText(event.target.value)
  }, [text]);

  
  const onSubmit = useCallback(event => {
    event.preventDefault()
    storeRedux.dispatch(actionsInputComments.createComments({_id: props._id, _type: props._type}, token));
    setText('')
  }, [props._type, props._id]);

  return (
    token
     ? 
      props.formToggle
      ?<form 
      className={cn()}
      onSubmit={onSubmit}
    >
      <p>Новый Комментарий</p>
      <textarea
        onChange={onChange}
        value={text}
      />
      <button>Отправить</button>
     </form>
     : null
    : <p className={cn('login')}><span><Link to={'/login'}>Войдите</Link></span>, чтобы иметь возможность комментировать</p>
  )
}

CommentsForm.propTypes = {
  _id: propTypes.string,
  _type: propTypes.string,
  token: propTypes.string,
  formToggle: propTypes.bool,
  setFormToggle: propTypes.func,
}

CommentsForm.defaultProps = {
  _id: '',
  _type: '',
  token: '',
  formToggle: false,
  setFormToggle: () => {},
}

export default React.memo(CommentsForm);
