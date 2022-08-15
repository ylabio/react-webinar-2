import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from "@bem-react/classname";
import './styles.css';
import { Link } from 'react-router-dom';

function Menu(props) {
    const cn = bem('Menu');

    return (
        <div className={cn()}>
            <div>
                <Link to={props.linkTo} className={cn('link')}>Главная</Link>
            </div>
        </div>
    )
}

Menu.propTypes = {
    linkTo: propTypes.string
}

Menu.defaultProps = {
    linkTo: "/"
}

export default React.memo(Menu);
