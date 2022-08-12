import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Pagination () {
    const cn = bem('Pagination');

    return (
        <p className={cn()}>
            <a className={cn('item')} href={'#'}>1</a> ... <a className={cn('item')} href={'#'}>7</a><a className={cn('item') + ' ' + cn('item--active')} href={'#'}>8</a><a className={cn('item')} href={'#'}>9</a>... <a className={cn('item')} href={'#'}>25</a>
        </p>
    )
}

export default React.memo(Pagination);