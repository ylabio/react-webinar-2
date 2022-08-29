import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import {Link} from "react-router-dom";
import './style.css';

function ItemComment({changeTextComment, exists, attemptAddNewComment, item, textComment, id, changeId, t, lang, link}) {
  const cn = bem('ItemComment');
  
  const dateFunc = (date, lang) => {
    const newDate = new Date(date).toLocaleString(lang, {year: 'numeric', month: 'long', day: 'numeric'});
    if (lang === 'en') {
      return newDate
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
 
 const formSubmit = (e) => {
   e.preventDefault();
   const form = e.target.elements;
   const comment = form['comment'].value;
   attemptAddNewComment(comment, id, 'comment');
   changeId('');
 }

  return (
    <div className={cn()} style={{paddingLeft: 40 + item.padding}} key={item._id}>
      <div className={cn('name')}><strong>{item.author.profile.name}</strong></div>
      <div className={cn('date')}>{dateFunc(item.dateCreate, lang)} {t('comments.at')} {timeFunc(item.dateCreate)}</div>
      <div className={cn('text')}>{item.text}</div>
      <button className={cn('button')} onClick={()=>changeId(item._id)}>{t('comments.answerButtonName')}</button>
     
      { id === item._id && 
        (exists ?
          <div>
            <form onSubmit={formSubmit}>
              <div className={cn('comment')}>
                <div className={cn('new-res')}>
                  <strong>{t('comments.newAnswer')}</strong>
                </div>
                
                  <textarea id='comment' value={textComment} onChange={(e)=>changeTextComment(e.target.value)}/>
               
                <button className={cn('btn1')} type='submit'>{t('comments.sendButtonName')}</button>
              </div>
           </form>
           <button className={cn('btn2')} onClick={()=>{changeId('')}}>{t('comments.cancelButtonName')}</button>
          </div>
        :
          <div className={cn('ent1')}>
            <div className={cn('ent')}><Link to={link}>{t('comments.signIn')}</Link>{t('comments.toBeAnleToAnswer')}.</div>
            <button className={cn('btn3')} onClick={()=>{changeId('')}}>{t('comments.cancelButtonName')}</button>
          </div>
        )
      }     
    </div>
  )
}

ItemComment.propTypes = {
  changeTextComment: propTypes.func.isRequired,
  exists: propTypes.bool.isRequired,
  attemptAddNewComment: propTypes.func.isRequired,
  item: propTypes.object.isRequired,
  textComment: propTypes.string.isRequired,
  id: propTypes.string.isRequired,
  changeId: propTypes.func.isRequired,
  t: propTypes.func,
  lang: propTypes.string,
  link: propTypes.string
}

ItemComment.defaultProps = {
  t: (text) => text,
  lang: 'ru',
  link: ''
}

export default React.memo(ItemComment);