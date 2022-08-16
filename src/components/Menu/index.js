import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from "@bem-react/classname";
import './styles.css';
import { Link } from 'react-router-dom';

function Menu(props) {
    const cn = bem('Menu');

    return (
        <div className={cn()}>
            <Link to={props.linkTo} className={cn('link')}>
                {props.text.main}
            </Link>
        </div>
    )
}

Menu.propTypes = {
    linkTo: propTypes.string,
    text: propTypes.object
}

Menu.defaultProps = {
    linkTo: "/",
    text: {}
}

export default React.memo(Menu);
