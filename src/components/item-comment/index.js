import React, { useLayoutEffect, useRef } from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function ItemComment({item, changeId, t, lang, scrollCommentId, ownName}) {
  const cn = bem('ItemComment');

  const ref = useRef(null);

  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView();
    } 
  }, [])

  const dateFunc = (date, lang) => {
    const newDate = new Date(date).toLocaleString(lang, {year: 'numeric', month: 'long', day: 'numeric'});
    if (lang === 'en') {
      return newDate;
    } else {
      const newDateWithoutYear = newDate.slice(0, newDate.length - 3);
      return newDateWithoutYear;
    }  
  }
 
  const timeFunc = (date) => {
    const hourMinutes = date.split('T')[1].split(':');
    const time = `${hourMinutes[0]}:${hourMinutes[1]}`;
  
    return time;
 }

  return (
    <div className={cn()} style={{paddingLeft: 40 + item.padding}} key={item._id} ref={scrollCommentId===item._id?ref:null}>
      <div className={cn('name')}>
        <strong>
          {item.author.profile?.name || ownName}
        </strong>
      </div>
      <div className={cn('date')}>
        {dateFunc(item.dateCreate, lang)} {t('comments.at')} {timeFunc(item.dateCreate)}
      </div>
      <div className={cn('text')}>
        {item.text}
      </div>
      <button className={cn('button')} onClick={()=>changeId(item._id)}>
        {t('comments.answerButtonName')}
      </button>
    </div>
  )
}

ItemComment.propTypes = {
  item: propTypes.object.isRequired,
  changeId: propTypes.func.isRequired,
  t: propTypes.func,
  lang: propTypes.string,
  scrollCommentId: propTypes.string,
  ownName: propTypes.string
}

ItemComment.defaultProps = {
  t: (text) => text,
  lang: 'ru',
  scrollCommentId: '',
  ownName: ''
}

export default React.memo(ItemComment);
