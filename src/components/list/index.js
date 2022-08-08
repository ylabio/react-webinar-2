import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function List(props) {
  const cn = bem('List');

  return (
    <ul className={cn()}>
      {props.children}
    </ul>
  )
}

List.propTypes = {
  children: propTypes.node,
}

List.defaultProps = {
}

export default React.memo(List);
