import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from "@bem-react/classname";
import './style.css';

function CommentsList(props) {
    const cn = bem('CommentsList');

    const createDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: "numeric",
            timezone: 'UTC'
        };

        const date = new Date(dateString).toLocaleString("ru", options);
        return date.replace("г.,", "в")
    }

    const calcPadding = (level) => {
        const padding = 30*level;
        return padding < 500 ? `${padding}px` : "50%"
    }

    const callbacks = {
        onClick: useCallback((parent) => {
            props.onClick(parent);
        }, [props.onClick])
    }

    return (
        <div className={cn("wrapper")}>
        <div className={cn("title")}>{`Комментарии (${props.items.length})`}</div>
        <div className={cn()}>
            {props.items.map(item =>
            <div key={item._id} className={cn('item')} style={{ "paddingLeft": calcPadding(item.level) }} >
                <div className={cn("column")}>
                    <div className={cn("item-username")}>{item.author.profile.name}</div>
                    <div className={cn("item-date")}>{createDate(item.dateCreate)}</div>
                </div>
                <div className={cn("column")}>
                    <div className={cn("item-text")}>{item.text}</div>
                </div>
                <div className={cn("column")} onClick={() => callbacks.onClick(item._id)}>
                    <div className={cn("reply")}>Ответить</div>
                </div>
                {item._id === props.newComParent && props.commentsAdd(item.author.profile.name)}
            </div>
        )}
        {props.newComParent === "" && props.commentsAdd()}
        </div>
        </div>
    )
}

CommentsList.propTypes = {
    items: propTypes.arrayOf(propTypes.object),
    onClick: propTypes.func,
    newComParent: propTypes.string,
    comentsAdd: propTypes.node,
}

CommentsList.defaultProps = {
    items: [],
    onClick: () => {},
    newComParent: "",
}

export default React.memo(CommentsList);
