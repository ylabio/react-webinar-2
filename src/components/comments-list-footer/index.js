import React, {useRef, useCallback} from "react";
import propTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import "./styles.css";

function CommentsListFooter(props) {
  const ref = useRef();

  const cn = bem('CommentsListFooter');

  const callbacks = {
    onSend: useCallback(() => {
      props.postComment(ref.current.value);
      ref.current.value = "Текст";
    }, [props.postComment])
  };

  return (
    <div className={props.show ? cn() : cn('hide')}>
      {props.session 
        ? <div>
            <div className={cn('form-header')}>Новый комментарий</div>
            <textarea ref={ref} defaultValue="Текст"/>
            <button onClick={callbacks.onSend}>Отправить</button>
          </div> 
        : <div>
            {props.renderLink()}, чтобы иметь возможность комментировать
          </div>
      }
    </div>
  )
}

CommentsListFooter.propTypes = {
  session: propTypes.bool.isRequired,
  renderLink: propTypes.func.isRequired,
  postComment: propTypes.func.isRequired,
  show: propTypes.bool.isRequired
}

export default React.memo(CommentsListFooter);