import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname'
import formateDate from '../../utils/fromate-date';
import './style.css';

function Comment(props) {
    const cn = bem('Comment')
    
    const padding = () => {
       return 40*(props.item.depth) < 500 ? {paddingLeft: 40*(props.item.depth)} : {paddingLeft: '50%'}
    }
    return (
        <div className={cn()} style={padding()}>
            <div className={cn('author')}>{props.item.author.profile.name}<span>{formateDate(props.item.dateCreate)}</span></div>
            <div className={cn('text')}>{props.item.text}</div>
            <button className={cn('btn')} onClick={() => props.addComment(props.item._id)}>Ответить</button>
            {props.children}
        </div>
    )
}

Comment.propTypes = {
    item: propTypes.object,
    addComment: propTypes.func,
    children: propTypes.node
}

Comment.defaultProps = {
    item: {},
    addComment: () => {}
}

export default React.memo(Comment)