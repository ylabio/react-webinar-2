import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from "@bem-react/classname";
import './styles.css';
import { Link } from 'react-router-dom';

function Menu(props) {
    const cn = bem('Menu');

    const langArr = ["RU", "ENG"];

    const callbacks = {
        onClick: useCallback((lang) => props.setLang(lang), [props.setLang])
    };

    return (
        <div className={cn()}>
            <Link to={props.linkTo} className={cn('link')}>
                {props.text.main}
            </Link>
            <div className={cn('lang')}>
                {langArr.map((lang, i, arr) => {
                    return (
                        <span onClick={() => callbacks.onClick(lang)} key={i}>
                            {i === arr.length - 1 ? lang : lang + " / "}
                        </span>
                    )
                }
                )}
            </div>
        </div>
    )
}

Menu.propTypes = {
    linkTo: propTypes.string,
    setLang: propTypes.func,
    translate: propTypes.func,
    text: propTypes.object
}

Menu.defaultProps = {
    linkTo: "/",
    setLang: () => { },
    text: {}
}

export default React.memo(Menu);
