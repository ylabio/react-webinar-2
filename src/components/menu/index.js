import React from 'react';
import propTypes from 'prop-types';
import { translate } from '../../utils/languages';
import {cn as bem} from "@bem-react/classname";
import { NavLink } from 'react-router-dom';
import './style.css';

function Menu() {
    const cn = bem('Menu')
    return (
        <div className={cn()}>
            <NavLink to="/" className={cn('link')}>{translate('link')}</NavLink>
        </div>
    )
}

export default React.memo(Menu)