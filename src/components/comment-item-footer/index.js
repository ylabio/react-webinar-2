import React, {useRef, useCallback} from "react";
import propTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import "./styles.css";

function CommentItemFooter(props) {
  const ref = useRef();

  const cn = bem('CommentItemFooter');
  
  const callbacks = {
    onClick: useCallback(() => {
      props.setItemFooter('');
      props.setListFooter(true);
    }, [props.setItemFooter, props.setListFooter]),

    onSend: useCallback(() => {
      props.postComment(ref.current.value);
      ref.current.value = `Мой ответ для ${props.userName}`;
      props.setItemFooter(''); 
      props.setListFooter(true);
    }, [props.postComment, props.setItemFooter, props.setListFooter])
  };

  const onClick = () => {
    props.setItemFooter('');
    props.setListFooter(true);
  };

  const onSend = () => {
    props.postComment(ref.current.value);
    ref.current.value = `Мой ответ для ${props.userName}`;
    props.setItemFooter(''); 
    props.setListFooter(true);
  }

  return (
    <div className={props.show ? cn() : cn('hide')}>
      {props.session 
        ? <div className={cn('form')}>
            <div className={cn('form-header')}>Новый ответ</div>
            <textarea ref={ref} defaultValue={`Мой ответ для ${props.userName}`}/>
            <button onClick={onSend}>Отправить</button>
            <button onClick={callbacks.onClick}>Отмена</button>
          </div>  
        : <div>
            {props.renderLink()}, чтобы иметь возможность ответить. <span onClick={onClick}>Отмена</span>
          </div>
      }
    </div>
  )
}

CommentItemFooter.propTypes = {
  session: propTypes.bool.isRequired,
  userName: propTypes.string.isRequired,
  renderLink: propTypes.func.isRequired,
  postComment: propTypes.func.isRequired,
  show: propTypes.string.isRequired,
  setItemFooter: propTypes.func.isRequired,
  setListFooter: propTypes.func.isRequired
}

export default React.memo(CommentItemFooter);