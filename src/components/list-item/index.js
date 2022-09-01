import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function ListItem(props) {
  const cn = bem('ListItem');

  return <div className={cn()}>{props.children}</div>;
}

ListItem.propTypes = {
  children: propTypes.node
};

ListItem.defaultProps = {};

export default React.memo(ListItem);
