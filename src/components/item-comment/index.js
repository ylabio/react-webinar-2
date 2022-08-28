import React from "react";
import {cn as bem} from "@bem-react/classname";
import './style.css';
import propTypes from "prop-types";

function ItemComment({author, date, text, nestingLevel, replyForm, setReply, myself, key, t}) {

  // CSS классы по БЭМ
  const cn = bem('ItemComment');
  const myselfClass = myself ? ' myself' : '';

  return (
    // Смещение по горизонтали вправо на 30px с каждым новым уровнем вложенности
    <div className={cn()} style={{paddingLeft: 30 * nestingLevel > 150 ? 150 : 30 * nestingLevel}}>
      <div className={cn('head')}>
        <span className={cn('user' + myselfClass)}>{author.name}</span>
        <span className={cn('date')}>{date}</span>
      </div>
      <div className={cn('text')}>
        {text}
      </div>
      <span className={cn('buttons')} onClick={setReply}>
        {t('comment.reply')}
      </span>
      {replyForm}
    </div>
  );
}

ItemComment.propTypes = {
  author: propTypes.object,
  date: propTypes.string,
  text: propTypes.string,
  nestingLevel: propTypes.number,
  replyForm: propTypes.node,
  setReply: propTypes.func,
  myself: propTypes.bool,
  key: propTypes.string,
  t: propTypes.func
}

ItemComment.defaultProps = {
  author: {},
  date: '',
  text: '',
  nestingLevel: 0,
  replyForm: '',
  setReply: () => {},
  myself: false,
  key: '',
  t: (text) => text
}

export default React.memo(ItemComment);
