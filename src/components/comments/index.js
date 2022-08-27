import React from 'react';
import './style.css';
import {cn as bem} from "@bem-react/classname";
import CommentsItem from "../comments-item";



function Comments({comments, isAuthorized, openCommentForm, closeCommentForm, resetMessage}){


    const cn = bem('Comments');
    return (
        <div className={cn()}>
            <p className={cn('header')}>Комментарии ({comments?.length})</p>
                    <ul className={cn('list')}>
                        {
                            (comments)?.map(comment => (
                                    <CommentsItem
                                        date={comment.dateCreate}
                                        text={comment.text}
                                        key={comment.length + comment._id}
                                        openCommentForm={openCommentForm}
                                        closeCommentForm={closeCommentForm}
                                        resetMessage={resetMessage}
                                    />
                                )
                            )
                        }
                    </ul>
            {
                !isAuthorized
                    ?
                        <p className={cn('text')}><a className={cn('link')} href={'/login'}>Войдите</a>, чтобы иметь возможность комментировать</p>
                    :
                        <form className={cn('form')}>
                            <p className={cn('form-header')}>Новый комментарий</p>
                            <textarea  className={cn('form-area')} placeholder={'Текст'}></textarea>
                            <button className={cn('form-button')} type={'submit'}>Отправить</button>
                        </form>
            }

        </div>
    )
}
export default React.memo(Comments);

