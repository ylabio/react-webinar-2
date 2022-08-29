import React, { useCallback, useRef } from 'react'
import './style.css';
import {cn as bem} from "@bem-react/classname";

function CommentsWrapper ({id, commentsCount, children, isAuthorized, onSubmit}) {
    const areaTextRef = useRef();
    const cn = bem('Comments-wrapper');

    const handleSubmit = useCallback((event) => {
        event.preventDefault()
        onSubmit({
            parent: {
                _id: id,
                _type: 'article'
            },
            text: areaTextRef.current.value
        }).then(() => {
            areaTextRef.current.value = ''
        })
    })

    return (
        <div className={cn()}>
            <p className={cn('header')}>Комментарии ({commentsCount})</p>
            {children}
            {
                isAuthorized
                ?

                    <form className={cn('form')} onSubmit={handleSubmit} method={`POST`}>
                        <p className={cn('form-header')}>Новый комментарий</p>
                        <textarea  className={cn('form-area')} ref={areaTextRef} placeholder={'Текст'}></textarea>
                        <button className={cn('form-button')} type={'submit'}>Отправить</button>
                    </form>


                : <p className={cn('text')}><a className={cn('link')} href={'/login'}>Войдите</a>, чтобы иметь возможность комментировать</p>
            }

        </div>
    )
}

export default React.memo(CommentsWrapper);
