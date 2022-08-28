import React, {useCallback, useEffect, useState} from 'react';
import propTypes from 'prop-types';
import {Link} from "react-router-dom";
import {cn as bem} from "@bem-react/classname";
import actionsInputComments from '../../store-redux/comments_creator/actions';
import {useStore as useStoreRedux, useSelector as useSelectorRedux, shallowEqual, useDispatch} from "react-redux";
import {toggle} from '../../utils/counter'
import './style.css';

function CommentsByCommentForm(props) {
  const cn = bem('CommentsByCommentForm');
  const [text, setText] = useState()
  const [item, setItem] = useState(props.list[props.i])
  const dispatch = useDispatch()
  
  const token = localStorage.getItem('token')
  const storeRedux = useStoreRedux();

  const onChange = useCallback(event => {
    dispatch({type: 'comment/input', payload: event.target.value})
    setText(event.target.value)
  }, [text]);

  
  const onSubmit = useCallback(event => {
    event.preventDefault() 
    props.setFormToggle(true)
    storeRedux.dispatch(actionsInputComments.createComments({_id: props.id, _type: 'comment'}, token));
   
    setText('')

  }, [props._type, props._id]);

  return (
    <>
        <button className={cn('button')} onClick={() => toggle(props.list[props.i], props.setList, props.list, props.setFormToggle, props.formToggle)}>Ответить</button>
        {
            props.list[props.i].open
        ? token
        ? <form 
          className={cn()}
          onSubmit={onSubmit}
        >
          <p> <strong>Новый ответ</strong> </p>
          <textarea
            onChange={onChange}
            value={text}
          />
          <div className={cn('buttons')}>
            <button>Отправить</button>
            <button onClick={() => toggle(props.list[props.i], props.setList, props.list, props.setFormToggle, props.formToggle)}>Отмена</button>
          </div>
        </form>
        :<p className={cn('login')}><span><Link to={'/login'}>Войдите</Link></span>, чтобы иметь возможность комментировать</p>
        :null
     }
   
    </>
    
    
  )
}

CommentsByCommentForm.propTypes = {
  toggleFunc: propTypes.func,
  id: propTypes.string,
  _type: propTypes.string,
  list: propTypes.array,
  setList: propTypes.func,
  commentId: propTypes.string,
  formToggle: propTypes.bool,
  setFormToggle: propTypes.func,
}

CommentsByCommentForm.defaultProps = {
 
}

export default React.memo(CommentsByCommentForm);
