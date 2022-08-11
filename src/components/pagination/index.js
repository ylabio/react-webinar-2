import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Pagination() {
  const cn = bem('Pagination');

  console.log(cn('item', {active: true}))

  return(
    <ul className={cn()}>
      <li className={cn('item')}>1</li>
      <li className={cn('dots')}>...</li>
      <li className={cn('item')}>7</li>
      <li className={cn('item', {active: true})}>8</li>
      <li className={cn('item')}>9</li>
      <li className={cn('dots')}>...</li>
      <li className={cn('item')}>25</li>
    </ul>
  )
}

export default React.memo(Pagination);