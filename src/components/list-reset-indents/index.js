import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function ListResetIndents(props) {
  const cn = bem('ListResetIndents');

  return <ul className={cn()}>{props.children}</ul>;
}

ListResetIndents.propTypes = {
  children: propTypes.node
};

ListResetIndents.defaultProps = {};

export default React.memo(ListResetIndents);
