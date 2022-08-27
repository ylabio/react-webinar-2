import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import {Link} from "react-router-dom";
import './style.css';

function CommentLeave() {

  const cn = bem('CommentLeave');

  return (
      <div className={cn()}>
        <div className={cn('title')} >Новый ответ</div>
        <textarea type="text" value="Мой ответ для User №1"/>
        <div className={cn('buttons')}>
          <button className={cn('button-send')}>Отправить</button>
          <button className={cn('button-cancel')}>Отмена</button>
        </div>
      </div>
  )
}

CommentLeave.propTypes = {

}

CommentLeave.defaultProps = {

}

export default React.memo(CommentLeave);