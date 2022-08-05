import React, {useCallback, useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import plural from 'plural-ru';
import './style.css';

function Item(props) {
  const cn = bem('Item');

  return (
    <div className={cn()}>
      <div className={cn('number')}>
        {props.code}
      </div>
      <div className={cn('title')}>
        {props.title}
      </div>
      <div className={cn('children-inner')}>
        {props.children}
      </div>
      <div className={cn('actions')}>
        {props.actions}
      </div>
    </div>
  )
}

Item.propTypes = {
  code: propTypes.number.isRequired,
  title: propTypes.string,
  actions: propTypes.node,
  children: propTypes.node,
};

Item.defaultProps = {
  title: '',
};

export default React.memo(Item);
