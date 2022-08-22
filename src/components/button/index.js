import React from 'react';
import propTypes from 'prop-types';
import './styles.css';
import { cn as bem } from "@bem-react/classname";

function Button(props) {
    const cn = bem('Button');

    return <button className={props.type ? cn({ [props.type]: true }) : cn()}
        onClick={props.onClick}>{props.text}</button>;
}

Button.propTypes = {
    onClick: propTypes.func,
    type: propTypes.string,
}

Button.defaultProps = {
    onClick: () => { },
    type: '',
}

export default React.memo(Button);