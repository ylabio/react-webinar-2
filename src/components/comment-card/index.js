import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function CommentCard(props) {
  const cn = bem('CommentCard');
  return (
    <div className={cn()}>
      <div className={cn('info')}>
        <div className={cn('user')}>User #1</div>
        <div className={cn('date')}>25 августа 2022 в 14:00</div>
      </div>
      <div className={cn('content')}>
        Текст комментрия о том какой товар. Комментатор может оставить большой
        комментрий и он весь показывается. Текст комментрия о том какой товар.
        Комментатор может оставить большой комментрий и он весь показывается.
        Текст комментрия о том какой товар. Комментатор может оставить большой
        комментрий и он весь показывается.{' '}
      </div>
      <div className={cn('cta')}>
        <button>Ответить</button>
      </div>
    </div>
  );
}

CommentCard.propTypes = {};

CommentCard.defaultProps = {};

export default React.memo(CommentCard);
