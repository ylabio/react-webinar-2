import React, { useCallback, useRef } from 'react'
import './style.css';
import {cn as bem} from "@bem-react/classname";
import Comments from '../comments';
import {dateConvert} from '../../utils/date-convert';



function CommentsItem({id, comments, isAuthorized, text, date, openCommentForm, name, closeCommentForm, resetMessage, onSubmit}){
    console.log(comments)
    const cn = bem('Comments-item');
    const areaTextRef = useRef();

    const handleSubmit = useCallback((event) => {
        event.preventDefault()
        onSubmit({
            parent: {
                _id: id,
                _type: 'comment'
            },
            text: areaTextRef.current.value
        }).then(() => {
          areaTextRef.current.value = ''
        })
    }, [id])

    return (
        <li className={cn('item')}>
            <p className={cn('user-name')}>{name} <span className={cn('date')}>{dateConvert(date)}</span></p>
            <p className={cn('user-comment')}>{text}</p>
            <button className={cn('button')} onClick={openCommentForm}>Ответить</button>
            <form onSubmit={handleSubmit} className={cn('form' + ' ' +  'visually-hidden')}>
                <p className={cn('form-header')}>Новый ответ</p>
                <textarea  className={cn('form-area')} ref={areaTextRef} placeholder={`Мой ответ для ${name}`}></textarea>
                <div>
                    <button className={cn('form-button')} type={'submit'}>Отправить</button>
                    <button className={cn('form-button')} type={'reset'} onClick={closeCommentForm}>Отмена</button>
                </div>
            </form>
            <p className={'auth-message visually-hidden'}><a className={cn('link')} href={'/login'}>Войдите</a>, чтобы иметь возможность ответить. <button className={cn('reset-button')} type={'reset'} onClick={resetMessage}>Отмена</button></p>
            <Comments
              parentId={id}
              comments={comments}
              isAuthorized={isAuthorized}
              openCommentForm={openCommentForm}
              closeCommentForm={closeCommentForm}
              resetMessage={resetMessage}
              onSubmit={onSubmit}
            />
        </li>
    )
}
export default React.memo(CommentsItem);

