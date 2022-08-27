import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from "@bem-react/classname";
import './style.css';
import { Link } from 'react-router-dom';

function CommentsAdd(props) {
    const cn = bem('CommentsAdd');

    const callbacks = {
        //печатанье комментария
        onChange: useCallback((event) => {
            props.onChange(event.target.value);
        }, [props.onChange]),

        //отправка комментария
        onSubmit: useCallback((event) => {
            event.preventDefault();
            props.onSubmit(props.parentId)
        }, [props.onSubmit]),

        //сброс ответа на комментарий
        onClick: useCallback(() => {
            props.onClick("");
        }, [props.onClick]),
    }

    return props.exists ? (
        <form className={cn()} onSubmit={callbacks.onSubmit}>
            <span className={cn("title")}>
                {props.name ? "Новый ответ" : "Новый комменнтарий"}
            </span>
            <textarea name="text" onChange={callbacks.onChange} value={props.text} className={cn("textarea")} maxLength={1000} />
            <div className={cn("buttons")}>
                <div className={cn("submit")}>
                    <button disabled={props.waiting} type="submit">Отправить</button>
                </div>
                {props.name &&
                    <div className={cn("cancel")}>
                        <button type={'button'} onClick={callbacks.onClick}>
                            Отмена
                        </button>
                    </div>
                }
            </div>
        </form>
    ) : (
        <div className={cn("unlog")}>
            <Link to={props.login}>
                Войдите
            </Link>, чтобы иметь возможность комментировать
        </div>
    )
}

CommentsAdd.propTypes = {
    exists: propTypes.bool,
    onSubmit: propTypes.func,
    onChange: propTypes.func,
    onClick: propTypes.func,
    text: propTypes.string,
    waiting: propTypes.bool,
    login: propTypes.string,
    parentId: propTypes.string,
    name: propTypes.string,
}

CommentsAdd.defaultProps = {
    exists: false,
    onSubmit: () => { },
    onChange: () => { },
    onClick: () => { },
    text: "",
    waiting: false,
    login: "/login",
    parentId: "",
    name: "",
}

export default React.memo(CommentsAdd);
