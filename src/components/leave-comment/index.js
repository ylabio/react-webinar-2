import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import {Link} from "react-router-dom";
import './style.css';

function LeaveComment(props) {

  const cn = bem('LeaveComment');

  return (
      <div className={cn()}>
        <div className={cn('title')} >Новый {props.reply === 'reply' ? 'ответ' : 'комментарий'}</div>
        <textarea type="text" value="Мой ответ для User №1"/>
        <div className={cn('buttons')}>
          <button className={cn('button-send')}>Отправить</button>
          {props.reply === 'reply' && <button className={cn('button-cancel')}>Отмена</button>}
        </div>
      </div>
  )
}

LeaveComment.propTypes = {

}

LeaveComment.defaultProps = {

}

export default React.memo(LeaveComment);