import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import numberFormat from "../../utils/number-format";
import {cn as bem} from "@bem-react/classname";
import {Link} from "react-router-dom";
import './style.css';
import CommentLeave from '../comment-leave';

function ItemComments() {
  const cn = bem('ItemComments');

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <span className={cn('author')}>User №1</span>
        <span className={cn('date')}>25 августа 2022 в 14:00</span>
      </div>
      <div className={cn('text')}>Текст комментрия о том какой товар. Комментатор может оставить большой комментрий и он весь показывается. Текст комментрия о том какой товар. Комментатор может оставить большой комментрий и он весь показывается. Текст комментрия о том какой товар. Комментатор может оставить большой комментрий и он весь показывается. </div>
      <button className={cn('button')}>Ответить</button>
      <div className={cn('notice')}>
        <span className={cn('signIn')}>Войдите</span>, чтобы иметь возможность ответить.&nbsp;
        <span className={cn('cancel')}>Отмена</span>
      </div>
      <CommentLeave/>
      <CommentLeave/>
    </div>
  )
}

ItemComments.propTypes = {

}

ItemComments.defaultProps = {

}

export default React.memo(ItemComments);