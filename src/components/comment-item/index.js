import React from "react";
import './style.css';
import {cn as bem} from '@bem-react/classname'
import NewComment from "../../containers/new-comment";
import UnauthComment from "../unauth-comment";



function CommentItem({date, content, exists, keyId, level, name, onClikcHandler, onSignIn, selected}){
    
    const cn = bem('Comment');

    return(
        <div key={keyId} style = {{paddingLeft: `${(level + 1 )* 30}px`}} className={cn()}>
            <div className={cn('head')}>
                <div className={cn('name')}>{name}</div>
                <div className={cn('date')}>{date}</div>
                <div>{selected}</div>
            </div>
            <div className={cn('content')}>{content}</div>
            <div className={cn('answer')} onClick={()=>onClikcHandler(keyId)}>Ответить</div>
            {!selected
             ? null: exists
               ? <NewComment articleId={keyId} type='comment' /> 
               : <UnauthComment onSignIn={onSignIn}/>}
        </div>
    )
}

export default CommentItem