import React, {useRef} from "react";
import propTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import "./styles.css";

function CommentItemFooter(props) {
  const ref = useRef();

  const cn = bem('CommentItemFooter');

  const onClick = () => {
    props.setItemFooter('');
    props.setListFooter(true);
  };

  const onSend = () => {
    props.postComment(ref.current.value);
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
            <button onClick={onClick}>Отмена</button>
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