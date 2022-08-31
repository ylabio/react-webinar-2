import React from "react";
import './style.css';
import {cn as bem} from '@bem-react/classname'

function CommentForm({onChange, onSubmitHandler, value, type, onCancel}){
    // if (type === 'article') window.scroll(0,document.documentElement.offsetHeight);

    const cn = bem('Form');

    return(
        <div className={cn()}>
        <div className={cn('head')}>Новый комментарий</div>
        <form onSubmit={onSubmitHandler}>
            <textarea 
                className={cn('textarea')} 
                autoFocus 
                onChange={e => onChange(e.target.value)} 
                value={value} 
                placeholder='Текст'
            />
            <button type="submit" onSubmit={onSubmitHandler} className={cn('button')}>Отправить</button>
            {type === 'comment'? <button type="button" onClick={onCancel}>Отменить</button> : null}
        </form>
        </div>
    )
}

export default React.memo(CommentForm)