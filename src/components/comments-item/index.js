import React from 'react';
import './style.css';
import {cn as bem} from "@bem-react/classname";

export const dateConvert = (date) => {

    const month = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']

    const dataYear = date.slice(0, 4);
    const dataMonth = month[date.slice(5, 7) - 1];
    const dataDay = date.slice(8, 10);
    const time = date.slice(-13, -8)

    console.log(time)

    return `${dataDay} ${dataMonth} ${dataYear} в ${time}`
};


function CommentsItem ({text, date, openCommentForm, closeCommentForm, resetMessage}){
    const cn = bem('Comments-item');
    return (
        <li className={cn('item')}>
            <p className={cn('user-name')}>Непонятно откуда брать <span className={cn('date')}>{dateConvert(date)}</span></p>
            <p className={cn('user-comment')}>{text}</p>
            <button className={cn('button')} onClick={openCommentForm}>Ответить</button>
            <form className={cn('form' + ' ' +  'visually-hidden')}>
                <p className={cn('form-header')}>Новый ответ</p>
                <textarea  className={cn('form-area')} placeholder={'Мой ответ для'}></textarea>
                <div>
                    <button className={cn('form-button')} type={'submit'}>Отправить</button>
                    <button className={cn('form-button')} type={'reset'} onClick={closeCommentForm}>Отмена</button>
                </div>
            </form>
            <p className={'auth-message visually-hidden'}><a className={cn('link')} href={'/login'}>Войдите</a>, чтобы иметь возможность ответить. <button className={cn('reset-button')} type={'reset'} onClick={resetMessage}>Отмена</button></p>
        </li>
    )
}
export default React.memo(CommentsItem);

